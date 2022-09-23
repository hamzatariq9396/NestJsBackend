import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Patch,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import{Response ,Request} from 'express'
;
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('findUser')
  findUserByEmail(@Body() body) {
    return this.userService.findByEmail(body.email);
  }

  @Post('signin-user')
  LoginUser(@Body() body:UpdateUserDto,@Res({passthrough :true})response :Response) {
   return this.authService.signIn(body.email,body.password,response);

  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('getAllUsers')
  getAllUser(@Req() request:Request){
     return this.authService.getAllUser(request)
  }
  @Post('logout')
  LogoutUser(@Res({passthrough:true})response:Response){
    return this.authService.logout(response)

  }

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
   return this.authService.signup(body.name, body.email, body.password);
  }
 

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('allUsers')
  findUsers() {
    return this.userService.findAll();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  UpdateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
