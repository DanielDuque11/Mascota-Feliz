import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import { llave } from '../config/llaves';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt =require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository

  ) { }

  /*
   * Add service methods here
   */

  GenerarContrasena(){
    let Contrasena =generador(8, false);
    return Contrasena
  }


  CifrarContrasena(Contrasena:string){

    let contrasenaCifrada =  cryptoJS.MD5(Contrasena).toString();
    return contrasenaCifrada;

  }
  IdentificarUsuario(Usuario:string,Contrasena:string){
    try{
      let u=this.usuarioRepository.findOne({where:{Correo:Usuario, Contrasena:Contrasena}})
      if (u){
         return u;
      }
      return false;
    }catch{
      return false;

  }
}
  GenerarTokenJWT(usuario:Usuario){
     let token=jwt.sign({
      data:{
        id:usuario.id,
        correo:usuario.Correo,
        nombre:usuario.Nombre+"  "+usuario.Apellido
    }
  },
        llave.claveJWT);
     return token
}
  ValidarTokenJWT(token:string){
    try{
      let datos =jwt.verify(token,llave.claveJWT)
        return datos;
  } catch{
      return false;
  }
}

}

