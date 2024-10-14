import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class loginDto{
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsNotEmpty()
    password: string;
}