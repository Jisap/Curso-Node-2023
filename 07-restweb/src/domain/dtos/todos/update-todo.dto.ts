


export class UpdateTodoDto {

  private constructor(                  // El constructor es privado para garantizar que solo se puedan crear instancias
    public readonly id: number,         // de esta clase utilizado el método estático create
    public readonly text?: string,     
    public readonly completedAt?: Date,
  ) {}

  get values() {
    const returnObj:{[key:string]: any} = {};

    if(this.text) returnObj.text = this.text;
    if(this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] { // las props puede contener propiedades de cualquier nombre y tipo.

    const { id, text, completedAt } = props;
    let newCompletedAt = completedAt;

    if(!id || isNaN(Number(id))){
      return ['id must be a valid number']
    }

    if(completedAt){
      newCompletedAt = new Date(completedAt);
      if(newCompletedAt.toString() === 'Invalid Date'){
        return ['CompletedAt must be a valid date']
      }
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)]; // Si si existe el id, el texto y una fecha se devuelve 
  }                                                                 // una instancia de UpdateTodo con el valor de los mismos. 


}