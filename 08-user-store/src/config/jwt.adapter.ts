import jwt from "jsonwebtoken"
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED

export class JwtAdapter {

  static async generateToken( payload:any, duration:string='2h' ) {
    
    return new Promise((resolve) => {
      jwt.sign(                                         // sign devuelve un token apartir de un paylod que se codifica con el JWT_SEED
        payload, 
        JWT_SEED,
        {expiresIn: duration},
        (err, token) => {
          if(err) return resolve(null);
          resolve(token)
        } 

      )
    })
    
  }

  static validateToken<T>( token:string): Promise<T | null> {
  
    return new Promise((resolve) => {
      jwt.verify(                             // verify decodifica el token gracias a JWT_SEED y devuelve un payload
        token, 
        JWT_SEED,
        (err, decoded) => { 
          if(err) return resolve(null); 
          resolve(decoded as T)
        }
        
      )
    })
  }
}