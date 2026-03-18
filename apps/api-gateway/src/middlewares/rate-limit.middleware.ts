import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import {InjectRedis} from "@nestjs-modules/ioredis";
import Redis from "ioredis";
import { NextFunction, Request } from "express";
import { rateLimitConfig } from "src/config/rate-limit.config";




@Injectable()
export class RateLimitMiddleware implements NestMiddleware{

    constructor(
        @InjectRedis()
        private readonly redis:Redis
    ){}

    async use(req:Request,res:Response,next:NextFunction) {
            const ip=req.ip||req.headers['x-forwarded-for'] as string;
            const key=`rate-limit:${ip}`;

            const requests=await this.redis.incr(key);

            if(requests===1){
                await this.redis.expire(key,rateLimitConfig.ttl);
            }
            if(requests>rateLimitConfig.limit){
                throw new HttpException( 'Juda ko\'p so\'rov yuborildi. Biroz kuting.',HttpStatus.TOO_MANY_REQUESTS);

            }
            next();
    }
    

}