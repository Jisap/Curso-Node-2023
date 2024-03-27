import { Router } from 'express';

import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypedMiddleware } from '../middlewares/type.middleware';





export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();
   
    const controller = new FileUploadController(new FileUploadService)

    router.use( FileUploadMiddleware.containFile );   // Si se suben archivos al server permite establecer si el [] contendrá uno o varios objetos 
                                                      // Ademas establece dichos archivos en el req.body
                                                     

    router.use(TypedMiddleware.validTypes(['users', 'products', 'categories'])); // Comprueba que el type de la url esta dentro de los types permitidos

    // Definir las rutas
    // api/upload/single/<user|category|product>/
    // api/upload/multiple/<user|category|product>/
    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type' ,controller.uploadMultipleFiles); 


    return router;
  }


}
