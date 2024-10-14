import { Injectable, NestMiddleware , UnauthorizedException} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
// import * as jwt from 'jsonwebtoken'
// import jwt from 'jsonwebtoken
import { verify } from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        // console.log("Token:", token); 

        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        try {
            const payload = verify(token,"vishal123");
            req['userId'] = payload.sub; 
            // console.log("Decoded token:", payload.sub); 
            next();
        } catch (err) {
            console.error("Token verification error:", err);
            throw new UnauthorizedException('Invalid token');
        }
    }
}
