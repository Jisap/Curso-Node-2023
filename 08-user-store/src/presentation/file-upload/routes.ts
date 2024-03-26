import { Router } from 'express';

import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';





export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();
   
    const controller = new FileUploadController(new FileUploadService)

    router.use( FileUploadMiddleware.containFile ); // Si se suben archivos al server permite establecer si el [] contendrá uno o varios objetos 
                                                    // Ademas establece dichos archivos en el req.body
    // Definir las rutas
    // api/upload/single/<user|category|product>/
    // api/upload/multiple/<user|category|product>/
    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type' ,controller.uploadMultipleFiles); // El middleware valida el jwt del usuario logueado contra el usuario en bd


    return router;
  }


}
