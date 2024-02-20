

export class CreateTodoDto {

  private constructor(              // El constructor es privado para garantizar que solo se puedan crear instancias
    public readonly text:string     // de esta clase utilizado el método estático create  
  ){}

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] { // las props puede contener propiedades de cualquier nombre y tipo.
      
      const { text } = props
      if(!text) return ['Text property is required', undefined] // Si no existe el text -> error

      return [undefined, new CreateTodoDto(text)]; // Si si existe el texto se devuelve error:undefined
    }                                              // y una instancia de CreateTodo con el valor de text 


}