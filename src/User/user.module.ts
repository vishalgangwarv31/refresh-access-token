import { MiddlewareConsumer, Module , RequestMethod } from "@nestjs/common"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "./user.schema"
import { JwtModule } from "@nestjs/jwt"
import { AuthMiddleware } from "src/auth/auth.middleware"

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: 'vishal123',
            signOptions: { expiresIn: '1h' },
          }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
