import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from 'fs';
import { Uuid } from '../../config';
import { CustomError } from "../../domain";



export class FileUploadService {

  constructor(
    private readonly uuid = Uuid.v4
  ){}

  private checkFolder( folderPath: string ){
    if(!fs.existsSync(folderPath)){           // Si la carpeta de descarga que se recibe no existe
      fs.mkdirSync(folderPath)                // la creamos
    }

    //throw new Error ('Not implemented');
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'] 
  ) {
    try {
      
      const fileExtension = file.mimetype.split('/').at(1) ?? ''        // mimetype: 'image/jpeg' -> fileExtension
      if (!validExtensions.includes(fileExtension)) {
        throw CustomError
          .badRequest(`Invalid extension: ${fileExtension}, valid ones ${validExtensions}`);
      }
      
      const destination = path.resolve(__dirname, '../../../', folder); // Apuntamos a la carpeta uploads o la que se defina en el controller
  
      this.checkFolder( destination );                                  // Comprobamos si existe la carpeta de destino, sino existe se crea

      const fileName = `${this.uuid()}.${fileExtension}`;               // Generamos un nombre aleatorio con uuid del file seleccionado

      file.mv(`${destination}/${fileName}`);                            // Se mueve el archivo seleccionado a la carpeta de destino
      
      return { fileName }

    } catch (error) {
      throw error;
    }
  }

  async uploadMultiple(
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtension: string[] = ['png', 'jpg', 'jpeg', 'gif'] 
  ){
    const filesNames = await Promise.all(                                   // Se repite el proceso de uploadedFile por cada unos los files que se suban.
      files.map(file => this.uploadSingle(file, folder, validExtension))
    );

    return filesNames
  }
}