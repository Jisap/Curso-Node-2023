import { NextFunction, Request, Response } from "express";




export class TypedMiddleware {

  // Método que llama a una función
  static validTypes(validTypes: string[]) {                             // validTypes : Nombres válidos para la carpeta de destino

    return (req: Request, res: Response, next: NextFunction) => {
    
      const type = req.url.split('/').at(2) ?? '';                      // :type es la subcarpeta donde se alojará el file presente en la url de la petición
               
      if (!validTypes.includes(type)) {                                 // Comprobamos que el :type esta dentro de los types permitidos
        return res.status(400).json({ error: `Invalid type: ${type}, valid Ones ${validTypes}` })
      }

      next()
    }

    

  }
}