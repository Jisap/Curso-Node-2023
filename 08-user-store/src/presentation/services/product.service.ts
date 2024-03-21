
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { ProductModel } from '../../data/mongo/models/product.model';





export class ProductService {

  constructor() { }

  async createProduct(createProductDto: CreateProductDto,) { // name, available, description, user, category

    const productExits = await ProductModel.findOne({ name: createProductDto.name }); // Vemos si existe en bd
    if (productExits) throw CustomError.badRequest('Product already exits');

    try {

      const product = new ProductModel({  // Sino existe creamos instancia de product con el dto
        ...createProductDto,
      })

      await product.save();               // Grabamos en bd

      return product;

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }

  }

  async getProducts(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto;

    try {

      //  const total = await ProductModel.countDocuments()
      //  const categories = await ProductModel.find()
      //    .skip((page - 1) * limit)                     // Se aplica esta fórmula para saltar los elementos anteriores a la página actual.
      //    .limit(limit)                                 // Se aplica para limitar el número de resultados devueltos por página según el valor de limit.

      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
      ])

      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/products?page=${(page + 1)}&limit=${limit}`,
        prev: (page - 1 > 0) ? `/api/products?page=${(page - 1)}&limit=${limit}` : null,
        products: products
      }

    } catch (error) {
      throw CustomError.internalServer('Internal Server Error')
    }
  }

}