import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports:[TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: 'asdnhkjasnjkasndasndkasjdnasjkdnas',
    signOptions: {
      expiresIn: '1d',
    },
  }),],// Creating Repositry for us
  controllers: [UserController],
  providers: [UserService,AuthService]
})
export class UserModule {}
