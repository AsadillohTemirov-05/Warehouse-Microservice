import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { jwtConfig } from '../config/jwt.config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { SessionService } from 'src/session/session.service';

@Module({
  imports: [
      RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
      }),
    }),
    UsersModule,
    PassportModule,
    JwtModule.register(jwtConfig()),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy,SessionService],
  exports: [AuthService,SessionService],
})
export class AuthModule {}