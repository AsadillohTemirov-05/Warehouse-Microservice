import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @MessagePattern({cmd:'auth.register'})
  async register(@Payload() dto:RegisterDto){
    return this.authService.register(dto);
  };

  @MessagePattern({cmd:'auth.login'})
  async login(@Payload() dto:LoginDto){
    return this.authService.login(dto);
  };

  @MessagePattern({cmd:'auth.validate-token'})
  async validateToken(@Payload() token:string){
    return this.authService.validateToken(token);
  };


  @MessagePattern({cmd:'auth.get-profile'})
  async getProfile(@Payload() id:string){
    return this.authService.getProfile(id);

  }

}
