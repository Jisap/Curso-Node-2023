import { JwtAdapter, bcriptAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from './email.service';





export class AuthService {

  constructor(
    private readonly EmailService: EmailService  
  ){}


  public async registerUser (registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if(existUser) throw CustomError.badRequest("Email alreday exist")

    try {
      
      const user = new UserModel(registerUserDto);
      
      //Encriptat la contraseña
      user.password = bcriptAdapter.hash( registerUserDto.password );

      await user.save();

      //email de confirmación
      await this.sendEmailValidationLink(user.email)

      const {password, ...userEntity} = UserEntity.fromObject(user);
      
      //jwt <- para mantener la autenticación del usuario
      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer('Error while creatin JWT')

      return {
        user: { userEntity },
        token: token 
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
    
  }

  public async loginUser( loginUserDto: LoginUserDto ){
  
    const user = await UserModel.findOne({ email: loginUserDto.email });

    if (!user) {
      throw CustomError.badRequest("Email does not exist");
    }

    const isMatch = await bcriptAdapter.compare(loginUserDto.password, user.password);

    if (!isMatch) {
      throw CustomError.badRequest('Invalid password');
    }

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id:user.id });
    if( !token ) throw CustomError.internalServer('Error while creatin JWT')

    return {
      user: { userEntity },
      token: token 
    };

  }


  private sendEmailValidationLink = async(email:string) => {

    const token = await JwtAdapter.generateToken({email})               // Generamos un token basado en el email
    if(!token ) throw CustomError.internalServer('Error getting token')  

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`; // http://localhost:3000/api/auth/validate-email/:token

    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    }

    const isSent = await this.EmailService.sendEmail(options);          // Enviamos el email con el link que contiene el token
    if(!isSent) throw CustomError.internalServer("Error sendin email")
  
    return true;
  }

  public validateEmail = async(token:string) => {                     // Recibimos el token del email
    const payload = await JwtAdapter.validateToken(token);            // Usamos el JwtAdapter para obtener el payload
    if(!payload) throw CustomError.badRequest('Invalid Token')

    const { email } = payload as {email:string};                      // Del payload obtenemos el email
    if(!email) throw CustomError.internalServer('Email not in token')

    const user = await UserModel.findOne({ email })                   // Comprobamos que en bd existe el email    
    if(!user) throw CustomError.internalServer('Email not exits')

    user.emailValidated = true;                                       // Si exite cambiamos la prop emailValidate a true  
    await user.save();                                                // Grabamos en bd

    return true;                                                      // Retornamos true -> controller -> res.json('Email validated')
  }
}