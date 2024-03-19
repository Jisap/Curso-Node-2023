


export class CreateCategoryDto {

  private constructor(
    public readonly name: string,
    public readonly available: boolean,  
  ){}
                            // clave   valor     error     instancia dto
  static create( object: { [key:string]:any}):[string?, CreateCategoryDto?] {
    
    const { name, available = false } = object;
    
    let availableBoolean = available
    
    if(!name) return ['Missing name'];
    if(typeof available !== 'boolean'){           // Si available no es un boolean, osea es un string
      availableBoolean = (available === 'true')   // comprobamos si ese string = 'true', y si lo es availableBoolean = true
    }                                             // de lo contrario será false
            // error        Dto
    return [undefined, new CreateCategoryDto(name, availableBoolean)]

  }

}