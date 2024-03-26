import { NextFunction, Request, Response } from "express";




export class FileUploadMiddleware {

  static containFile(req: Request, res: Response, next: NextFunction) {
    
    if (!req.files || Object.keys(req.files).length === 0) {            // req.files contiene el archivo seleccionado por el usuario (comprobación)
      return res.status(400).json({ error: 'No files were selected' })  // Si no existe el archivo lanzamos el error.
    }

    if(!Array.isArray(req.files.file)) {    // Si no son varios los archivos seleccionados para subir
      req.body.files = [ req.files.file ]   // el body contendrá un array con solo un objeto
    }else {
      req.body.files = req.files.file       // Pero si si son varios los archivos seleccionados para subir
    }                                       // el body contendrá un array con varios objetos.  
  
    next();
  
  }
}