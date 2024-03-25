import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from '../services/file-upload.service';
import { UploadedFile } from "express-fileupload";





export class FileUploadController { // Controlador de rutas basado en un service

  constructor(
    private readonly fileUploadService:FileUploadService 
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  uploadFile = (req: Request, res: Response) => {

    const type = req.params.type;                                     // :type es la subcarpeta donde se alojará el file (comprobación)
    const validTypes = ['users', 'products', 'categories']
    if(!validTypes.includes(type)){
      return res.status(400).json({error: `Invalid type: ${type}, valid Ones ${validTypes}`})
    }
                                       
    if (!req.files || Object.keys(req.files).length === 0) {          // req.files contiene el archivo seleccionado por el usuario (comprobación)
      return res.status(400).json({error: 'No files were selected'})
    }

    const file = req.files.file as UploadedFile;                      // Convertido a tipo del middleware express-fileupload

    this.fileUploadService.uploadSingle(file, `uploads/${type}`)      // Usamos el servicio para subirlo a nuestro sistema en la carpeta seleccionada
      .then( uploaded => res.json(uploaded))
      .catch( error => this.handleError(error, res))
  }

  uploadMultipleFiles = async (req: Request, res: Response) => {
    res.json('uploadMultipleFiles')
  }
  

}