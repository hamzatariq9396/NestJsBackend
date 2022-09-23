import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtSerivice: JwtService,
  ) {}

  // User signup action

  async signup(name: string, email: string, password: string) {
    const userEmail = await this.userService.findByEmail(email);

    if (userEmail.length > 0) {
      throw new BadRequestException(
        'User is Found with This email: Sign up with the new email',
      );
    } else {
      const hashPassword = await bcrypt.hashSync(password, 10);

      return this.userService.create(name, email, hashPassword);
    }
  }
  // User signIn action
  async signIn(email: string, password: string, response: any) {
    const user = await this.userService.findByEmail(email);
    if (user.length == 0) {
      throw new BadRequestException('Invalid Email of a user ');
    } else {
      const hashPassword = user[0].password;
      const data = await bcrypt.compare(password, hashPassword);
      if (!data) {
        throw new BadRequestException('Invalid password of a user');
      } else {
        const jwt = await this.jwtSerivice.signAsync({ id: user[0].id });
        response.cookie('jwt', jwt, { httpOnly: true });
        return {
          message: 'success',
        };
      }
    }
  }
  // get User
  async getUser(request: any) {
    try {
      // Verify token

      const data = await this.jwtSerivice.verifyAsync(request.cookies['jwt']);

      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.userService.findOne(data.id);
      return {
        message: 'Verified user',
        user: user,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async logout(response: any) {
    response.clearCookie('jwt');
    return {
      message: 'User is logout successfuly',
    };
  }
  async deletetUser(id: number,) {
    
      const user = await this.userService.remove(id);
      return user; 
    
  }

  async findUser(id: number) {
    
      const user = await this.userService.findOne(id);
      delete(user.password)
      return user;
    
  }
}
