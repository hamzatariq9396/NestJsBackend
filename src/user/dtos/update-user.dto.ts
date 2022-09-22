import { IsEmail,IsString, IsOptional, IS_ALPHA } from "class-validator";

export class UpdateUserDto{
    @IsEmail()
    @IsOptional()
    email:string
    
    @IsString()
    @IsOptional()
    password:string
}