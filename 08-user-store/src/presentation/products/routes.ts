import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductsController } from './controller';
import { ProductService } from '../services';






export class ProductsRoutes {


  static get routes(): Router {

    const router = Router();
    const productService = new ProductService()
    const controller = new ProductsController(productService);

    // Definir las rutas
    router.get('/', controller.getProducts);
    router.post('/', [AuthMiddleware.validateJWT], controller.createProduct); // El middleware valida el jwt del usuario logueado contra el usuario en bd
                                                                              // y se incorpora al req.body

    return router;
  }


}
