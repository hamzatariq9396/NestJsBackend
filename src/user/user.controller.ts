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
  Req,UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import{Response ,Request} from 'express'
;
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private jwtSerivice: JwtService,
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
  @Get('getUser')
  getUser(@Req() request:Request){
     return this.authService.getUser(request)
  }
  @Post('logout')
  LogoutUser(@Res({passthrough:true}) response:Response){
    return this.authService.logout(response)
  }
  @Delete('deleteUser/:id')
 async DeleteUser(@Param('id') id:number,@Req() request:Request){
  try{
    const data = await this.jwtSerivice.verifyAsync(request.cookies['jwt'])
   if(!data){
    throw new UnauthorizedException()
   }
   else{
    return this.authService.deletetUser(id)
   }
  } catch(e){
    throw new UnauthorizedException()
  }
   
  }
@Get('auth/:id')
async getUserById(@Param('id') id:number,@Req() request:Request){
  try{
    const data = await this.jwtSerivice.verifyAsync(request.cookies['jwt'])
   if(!data){
    throw new UnauthorizedException()
   }
   else{
    return this.authService.findUser(id)
   }
  } catch(e){
    throw new UnauthorizedException()
  }
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
