import { JwtAdapter, bcriptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";





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

      //email de confirmación
      

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
}