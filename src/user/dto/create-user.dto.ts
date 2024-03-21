import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty({message: 'Name is required'})
    name: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail()
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    password: string;

}
