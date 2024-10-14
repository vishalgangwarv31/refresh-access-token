import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>,
                private jwtService: JwtService
        ) {}

    async signup(email:string,username:string, password: string) : Promise<UserDocument> {
        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(password,salt);

        const newUser = new this.userModel({email,username,password : hash});
        return newUser.save()
    }

    async login(email: string, password: string) : Promise<string>{
        const user  = await this.userModel.findOne({email}).exec();
        if(user && (await bcrypt.compare(password,user.password))) {
            const payload = { sub: user._id}
            const token = this.jwtService.sign(payload);
            return token;
        } else {
            return "invalid credential";
        }
    }
}
