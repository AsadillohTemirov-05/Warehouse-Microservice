import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = (): JwtModuleOptions => ({
  secret: process.env.JWT_SECRET || 'wms-secret-key',
  signOptions: {
    expiresIn: '7d',
  },
});