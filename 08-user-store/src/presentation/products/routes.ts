import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductsController } from './controller';






export class ProductsRoutes {


  static get routes(): Router {

    const router = Router();
    // const productService = new ProductsService()
    const controller = new ProductsController();

    // Definir las rutas
    router.get('/', controller.getProducts);
    router.post('/', [AuthMiddleware.validateJWT], controller.createProduct); // El middleware valida el jwt del usuario logueado contra el usuario en bd


    return router;
  }


}
