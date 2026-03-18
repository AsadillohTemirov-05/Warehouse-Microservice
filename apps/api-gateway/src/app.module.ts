import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { AuthProxyController } from './proxy/auth.proxy.controller';
import { microservicesConfig } from './config/microservices.config';
import { WarehouseProxyController } from './proxy/warehouse.proxy.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register(microservicesConfig),
  ],
  controllers: [
    AuthProxyController,
    WarehouseProxyController
  ],
})
export class AppModule {}