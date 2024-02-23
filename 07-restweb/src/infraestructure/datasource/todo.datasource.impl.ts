import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";


// Implementación de los métodos del domain datasource

export class TodoDatasourceImpl implements TodoDatasource {

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();             // Info desde prisma
    return todos.map( todo => TodoEntity.fromObject(todo)); // Transformacion de esa data a formato TodoEntity
  }

  findById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  deleteById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

 

}