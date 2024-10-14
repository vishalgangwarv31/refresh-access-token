import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service'
import { PassThrough } from 'stream';
import { userDto } from 'src/dto/user.dto';
import { loginDto } from 'src/dto/login.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService : UserService) {}

    @Post('signup')
    async signup(
        @Body() userDto: userDto
    ){
        const user = this.userService.signup(
            userDto.email ,userDto.username, userDto.password);
        return { message : "sign up success" }
    }

    @Post('login')
    async login(
        @Body() loginDto : loginDto, 
    ){
        const token =  await this.userService.login(loginDto.email,loginDto.password);
        return token;
    }
}
