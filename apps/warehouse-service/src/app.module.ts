import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WarehouseModule } from './warehouse/warehouse.module';
import {ConfigModule} from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
@Module({
  imports: [
   ConfigModule.forRoot({
    isGlobal:true
   }),
   TypeOrmModule.forRoot(databaseConfig()),
    WarehouseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
