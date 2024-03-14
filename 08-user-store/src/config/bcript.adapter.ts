
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'


export const bcriptAdapter = {

  hash: (password: string) => {        // Un hash es una función matemática que toma una entrada (o "mensaje") y devuelve una cadena de longitud fija,  
    const salt = genSaltSync()         // "salt" (sal) es una cadena aleatoria única que se agrega a la contraseña antes de calcular su hash.  
    return hashSync(password, salt)    // genera un hash seguro de la contraseña utilizando ese salt específico y la password 
  },

  compare: (password:string, hashed: string) => { // Se proporciona la pass y el hash almacenado en bd
    return compareSync(password, hashed)          // compareSync compara el hash generado desde la pass con el almacenado en bd
  }                                               // compareSync extrae automáticamente el salt del hash almacenado
}                                                 // y lo utiliza para generar un nuevo hash de la contraseña proporcionada.