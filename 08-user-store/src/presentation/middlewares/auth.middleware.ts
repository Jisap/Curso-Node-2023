import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";
import { JwtAdapter } from "../../config";


export class AuthMiddleware {

  static async validateJWT( req:Request, res:Response, next:NextFunction ){
  
    const authorization = req.header('Authorization');  // Los headers(authorization) contendrán un token con el user.id que logueo y creo la category
    if( !authorization) return res.status(401).json({error: 'No token provided'});
    if( !authorization.startsWith('Bearer')) return res.status(401).json({error: 'Invalid Bearer token'});

    const token = authorization.split(' ').at(1) || '';                      // De los headers obtenemos el token 

    try {

      const payload = await JwtAdapter.validateToken<{ id:string }>(token); // Del token obtenemos el payload (user.id logueado)
      if(!payload) return res.status(401).json({error: 'Invalid Token'})

      const user = await UserModel.findById( payload.id );                  // Obtenemos de la bd el user según usuario logueado
      if( !user ) return res.status(401).json({error: 'Error invalid token - user'})

      req.body.user = UserEntity.fromObject(user); // Se crea un objeto UserEntity a partir del usuario obtenido de la base de datos.
                                                   // Se asigna este objeto a req.body.user, que se puede utilizar en los controladores 
                                                   // posteriores para acceder a la información del usuario autenticado.
      next()

    } catch (error) {
      console.log(error)
      res.status(500).json({error: 'Internal server error'})
    }
    
  }
}