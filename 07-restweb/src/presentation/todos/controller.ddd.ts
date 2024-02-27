import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";




export class TodosController {

  constructor(
    private readonly todoRepository: TodoRepository  
  ){}

  public getTodos = async(req:Request, res:Response) => {
    // const todos = await prisma.todo.findMany() 
    // return res.json(todos);

    const todos = await this.todoRepository.getAll();
    return res.json(todos)
  }

  public getTodoById = async(req: Request, res: Response) => {
    const id = +req.params.id;
    //if(isNaN(id)) return res.status(400).json({error: 'Id argument is not a number'})

    // const todo = await prisma.todo.findFirst({
    //   where: { id }
    // });
    
    // ( todo )
    //   ? res.json(todo)
    //   : res.status(404).json({ error: `TODO with id ${ id } not found`})

    try {
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
    } catch (error) { 
      res.status(400).json({ error });
    }
  }

  public createTodo = async(req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(req.body) // el método create devuelve una instancia de createTodoDto = text
    if(error) return res.status(400).json({error})
    
    // const todo = await prisma.todo.create({
    //   data:  createTodoDto! 
    // })

    const todo = await this.todoRepository.create(createTodoDto!)

    res.json( todo )
  }

  public updateTodo = async(req: Request, res: Response) => {

    const id = +req.params.id
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id})
    if(error) return res.status(400).json({ error });

    // const todo = await prisma.todo.findFirst({
    //   where: { id }
    // });

    // if(!todo) return res.status(404).json({ error: `Todo with id ${ id } not found`});

    // const updateTodo = await prisma.todo.update({
    //   where: { id },
    //   data: updateTodoDto!.values
    // });

    const updateTodo = await this.todoRepository.updateById(updateTodoDto!)
    res.json(updateTodo)
  }

  public deleteTodo = async(req: Request, res: Response) => {
    
    const id = +req.params.id
    //if (isNaN(id)) return res.status(400).json({ error: 'Id argument is not a number' });

    // const todo = await prisma.todo.findFirst({
    //   where: { id }
    // });

    // if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

    // const deleted = await prisma.todo.delete({
    //   where: { id }
    // });

    // (deleted)
    //   ? res.json(deleted)
    //   : res.status(400).json({ error: `Todo with id ${id} not found`})
    
    const deletedTodo = await this.todoRepository.deletedById(id)
    res.json(deletedTodo)

  }


}