import { bcriptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";




export class AuthService {

  constructor(){}


  public async registerUser (registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if(existUser) throw CustomError.badRequest("Email alreday exist")

    try {
      
      const user = new UserModel(registerUserDto);
      
      //Encriptat la contraseña
      user.password = bcriptAdapter.hash( registerUserDto.password );

      await user.save();
      //jwt <- para mantener la autenticación del usuario
      //email de confirmación

      const {password, ...userEntity} = UserEntity.fromObject(user)

      return {
        user: { userEntity },
        token: "ABC" 
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

    return {
      user: { userEntity },
      token: "ABC" // Aquí deberías generar y devolver un token JWT real
    };

  }
}