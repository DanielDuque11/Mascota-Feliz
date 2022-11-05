import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {Request, RedirectRoute, HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {ParamsDictionary} from 'express-serve-static-core';
import parseBearerToken from 'parse-bearer-token';
import {ParsedQs} from 'qs';
import {AutenticacionService} from '../services';
import {request} from "express";





export class EstrategiaVendedor implements AuthenticationStrategy{
  name: string="vende";
  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion:AutenticacionService
  ){

  }
  async authenticate(request:Request): Promise<UserProfile | undefined> {
     let token =parseBearerToken(request);
     if(token){
       let datos=this.servicioAutenticacion.ValidarTokenJWT(token);
       if (datos){
         let perfil:UserProfile=Object.assign({
            Nombre:datos.data.nombre
          });
          return perfil;
      }else{
        throw new HttpErrors[401]("El token incluido no es válido")
      }
   } else{
    throw new HttpErrors[401]("No se ha  incluido un token en la solicitud")
   }
  }
}
