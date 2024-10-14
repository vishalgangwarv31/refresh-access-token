import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class userDto{
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsNotEmpty()
    username: string;

    @MinLength(6,{message : " too short! please enter more than 6 char"})
    password: string;
}