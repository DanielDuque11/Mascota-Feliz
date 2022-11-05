import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {llave} from '../config/llaves';
import {Credenciales, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {AutenticacionService} from '../services';

const fetch =require("node-fetch");

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
    @service(AutenticacionService)
    public servicioAutenticacion:AutenticacionService
  ) {}


  @post("/identificarUsuarios",{
    responses:{
      "200":{
        description:"Identificación de usuarios"
      }
    }
  })
  async identificarUsuarios(
    @requestBody()Credenciales:Credenciales
  ){

let u= await this.servicioAutenticacion.IdentificarUsuario(Credenciales.Usuario, Credenciales.Contrasena);
if(u){
  let token = this.servicioAutenticacion.GenerarTokenJWT(u);
  return {
    datos:{
      Nombre:u.Nombre,
      Apellido:u.Apellido,
      Correo:u.Correo,
      Rol:u.Rol,
      id:u.id
    },
    tk:token
  }

} else{
  throw new HttpErrors[401]("Datos Inválidos");
}
}

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {

    let Contrasena = this.servicioAutenticacion.GenerarContrasena();
    let contrasenaCifrada = this.servicioAutenticacion.CifrarContrasena(Contrasena);
    usuario.Contrasena =contrasenaCifrada;
    let u = await this.usuarioRepository.create(usuario);

    //notificar al usuario

    let destino=usuario.Correo;
    let asunto="Registro exitoso  en la plataforma mascota feliz";
    let contenido=`Bienvenido ${usuario.Nombre }  su nombre de usuario es : ${usuario.Correo} y su contraseña es : ${Contrasena}`


    fetch(`${llave.urlserviciosNotificaciones}/email?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then(( data: any)=>{
        console.log(data);
      })
    return u;

  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
