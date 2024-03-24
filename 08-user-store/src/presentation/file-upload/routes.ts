import { Router } from 'express';

import { FileUploadController } from './controller';





export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();
   
    const controller = new FileUploadController()

    // Definir las rutas
    // api/upload/single/<user|category|product>/
    // api/upload/multiple/<user|category|product>/
    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type' ,controller.uploadMultipleFiles); // El middleware valida el jwt del usuario logueado contra el usuario en bd


    return router;
  }


}
