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

    const type = req.params.type;                                     // :type es la subcarpeta donde se alojará el file 
    const validTypes = ['users', 'products', 'categories']            // Nombres válidos para la carpeta de destino
    if(!validTypes.includes(type)){                                   // Comprobación de la validez del nombre de la carpeta
      return res.status(400).json({error: `Invalid type: ${type}, valid Ones ${validTypes}`})
    }
                                       
    const file = req.body.files.at(0) as UploadedFile                 // Obtenemos del body via middleware en routes del [] con el file 

    this.fileUploadService.uploadSingle(file, `uploads/${type}`)      // Usamos el servicio para subirlo a nuestro sistema en la carpeta seleccionada
      .then( uploaded => res.json(uploaded))
      .catch( error => this.handleError(error, res))
  }

  uploadMultipleFiles = async (req: Request, res: Response) => {
    
    const type = req.params.type;                                     // :type es la subcarpeta donde se alojará el file 
    const validTypes = ['users', 'products', 'categories']            // Nombres válidos para la carpeta de destino
    if (!validTypes.includes(type)) {                                 // Comprobación de la validez del nombre de la carpeta
      return res.status(400).json({ error: `Invalid type: ${type}, valid Ones ${validTypes}` })
    }

    const files = req.body.files as UploadedFile[]                    // Obtenemos del body via middleware en routes del [] con el file 

    this.fileUploadService.uploadMultiple(files, `uploads/${type}`)   // Usamos el servicio para subirlo a nuestro sistema en la carpeta seleccionada
      .then(uploaded => res.json(uploaded))
      .catch(error => this.handleError(error, res))
  }
  

}