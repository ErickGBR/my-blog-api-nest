import { IsNotEmpty, IsString, IsEmail } from "class-validator";


export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}


export class UpdatedUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}