import {Body, Controller, Get, Inject, Post, UseGuards} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CurrentUser, JwtPayload, SERVICE_NAMES } from "@wms/common";
import { GatewayLoginDto, GatewayRegisterDto } from "./dto/auth.dto";
import { firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";




@Controller('auth')
export class AuthProxyController{

 
    constructor(
        @Inject(SERVICE_NAMES.AUTH)
        private readonly authClient:ClientProxy
    ){}



    @Post('register')
    async register(@Body() dto:GatewayRegisterDto){
        return firstValueFrom(
            this.authClient.send({cmd:'auth.register'},dto)
        );
    }

    @Post('login')
    async login(@Body() dto:GatewayLoginDto){

        return firstValueFrom(
            this.authClient.send({cmd:'auth.login'},dto)
        )
    }



    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user:JwtPayload){
        return firstValueFrom(
            this.authClient.send({cmd:'auth.get-profile'},user.sub)
        )
    }
}