import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { WarehouseRepository } from './warehouse.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Zone } from './entities/zone.entity';
import { WarehouseLocation } from './entities/location.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Warehouse,Zone,WarehouseLocation]),
  ],

  controllers:[WarehouseController],
  providers:[WarehouseRepository,WarehouseService]
})
export class WarehouseModule {}
