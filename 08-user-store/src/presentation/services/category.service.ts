import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";




export class CategoryService {

  constructor(){}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity){ // name, available, user
    
    const categoryExits = await CategoryModel.findOne({ name: createCategoryDto.name }); 
    if(categoryExits) throw CustomError.badRequest( 'Category already exits' );
  
    try {

      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      })

      await category.save();

      return{
        id: category.id,
        name: category.name,
        available: category.available
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  
  }

  async getCategories() {
    
    try {

      const categories = await CategoryModel.find();
      return categories.map(category => ({
        id: category.id,
        name: category.name,
        available: category.available
      }))
  
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error')
    }
  }

}