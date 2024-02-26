import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDto } from '../dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/todos/update-todo.dto';



export abstract class TodoRepository {

  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;   // Crea un todoEntity desde un CreateTodoDto
  abstract getAll(): Promise<TodoEntity[]>                              // Obtiene un [] de TodoEntity
  abstract findById(id: number): Promise<TodoEntity>                    // Busca por id un TodoEntity
  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>// Actualiza por id (updateTodoDto) un TodoEntity   
  abstract deletedById(id: number): Promise<TodoEntity>                  // Borra por id un TodoEntity

}
