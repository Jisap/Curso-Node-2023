import { Request, Response } from "express";
import { CustomError, PaginationDto } from "../../domain";





export class ProductsController { // Controlador de rutas basado en un service

  constructor(
    //private readonly productService: ProductService
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  createProduct = (req: Request, res: Response) => {
    // const [error, createProductDto] = CreatePproductDto.create(req.body);
    // if (error) return res.status(400).json({ error })

    // this.productService.createCategory(createProductyDto!, req.body.user) // graba en bd la category
    //   .then(product => res.status(201).json(product))
    //   .catch(error => this.handleError(error, res))

    return res.json('Create Products')
  }

  getProducts = async (req: Request, res: Response) => {

    const { page = 1, limit = 10 } = req.query
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error })

    // this.productService.getCategories(paginationDto!)
    //   .then(product => res.json(product))
    //   .catch(error => this.handleError(error, res))

    return res.json('get Products')
  }


}