import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { TokenDto } from './dto/token.dto';
import { User } from '../users/entities/user.entity';
import { BusinessException, JwtPayload } from '@wms/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<TokenDto> {
    const user = await this.usersService.create({
      email: dto.email,
      password: dto.password,
      fullName: dto.fullName,
    });
    return this.generateToken(user);
  }

  async login(dto: LoginDto): Promise<TokenDto> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new BusinessException('Email yoki parol noto\'g\'ri');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new BusinessException('Email yoki parol noto\'g\'ri');
    }

    if (!user.isActive) {
      throw new BusinessException('Foydalanuvchi bloklangan');
    }

    return this.generateToken(user);
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify<JwtPayload>(token);
    } catch {
      throw new BusinessException('Token yaroqsiz');
    }
  }

  async getProfile(id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  private generateToken(user: User): TokenDto {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }
}