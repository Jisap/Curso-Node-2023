import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';



export class AuthController { // Controlador de rutas basado en un service

  constructor(
    public readonly authService: AuthService  // Inyección de un service
  ){}

  private handleError = (error:unknown, res:Response) => {
    if( error instanceof CustomError){
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }


  registerUser = (req:Request, res:Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body) // Obtención/creación del Dto
    if(error) return res.status(400).json({error});                     

    this.authService.registerUser(registerDto!)                   // Comprueba que el usuario no existe y grabación nuevo user en bd -> link email -> validateEmail ->
      .then((user) => res.json(user))                             // userEntity sin password -> token desde user.id -> return: token, userEntity
      .catch(error => this.handleError(error, res))               
  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginDto] = LoginUserDto.create(req.body)
    if(error) return res.status(400).json({error})

    this.authService.loginUser(loginDto!)
      .then((user) => res.json(user))
      .catch(error => this.handleError(error, res))
  }

  validateEmail = (req: Request, res: Response) => {
    const {token} = req.params;                         // recibimos el token desde el link del email
    
    this.authService.validateEmail(token)               // Se envía al servicio de validatedEmail
      .then(() => res.json('Email validated'))
      .catch(error => this.handleError(error, res))
    
  }

}