import { CustomError } from "../errors/custom.error";


export class UserEntity {

  constructor(
    public id: string,
    public name: string,  
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public role: string[],
    public img?: string,
  ){}
                                  //key:    value  
  static fromObjecto( object: { [key:string]:any }){

    const { id, _id, name, email, emailValidated, password, role, img } = object;

    if (!_id && !id){
      throw CustomError.badRequest("Missing id");
    }

    if (!name) throw CustomError.badRequest('Missing name');
    if (!email) throw CustomError.badRequest('Missing name');
    if (emailValidated === undefined ) throw CustomError.badRequest('Missing emailValidated');
    if (!password) throw CustomError.badRequest('Missing password');
    if (!role) throw CustomError.badRequest('Missing role');
    
    return new UserEntity(_id || id, name, email, emailValidated, password, role, img)
  }
}