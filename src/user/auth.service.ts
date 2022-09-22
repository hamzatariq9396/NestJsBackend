import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtSerivice: JwtService,
  ) {}

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

  async signIn(email: string, password: string ,response:any) {
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
       response.cookie(jwt,{httpOnly:true })
        return{
            message:"success",
            token:jwt
        }
      }
    }
  }
}
