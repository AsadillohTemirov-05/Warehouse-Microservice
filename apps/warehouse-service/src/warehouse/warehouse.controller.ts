import { Controller } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateLocationDto, CreateWarehouseDto, CreateZoneDto } from './dto/create-warehouse.dto';
import { UpdateLocationDto, UpdateWarehouseDto, UpdateZoneDto } from './dto/update-warehouse.dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}


  @MessagePattern({cmd:'warehouse.create'})
  async createWarehoouse(@Payload() dto:CreateWarehouseDto){
    return this.warehouseService.createWarehouse(dto);
  };


  @MessagePattern({cmd:'warehouse.findAll'})
  async findAllWarehouses(){
    return this.warehouseService.findAllWarehouses();
  };

  @MessagePattern({cmd:'warehouse.findOne'})
  async findWarehouseById(@Payload() id:string){
    return this.warehouseService.findWarehouseById(id);
  };


  @MessagePattern({cmd:'warehouse.update'})
  async updateWarehouse(@Payload() payload:{id:string} & UpdateWarehouseDto){
    const {id,...dto}=payload;
    return this.warehouseService.updateWarehouse(id,dto);
  }


  @MessagePattern({cmd:'warehouse.delete'})
  async deleteWarehouse(@Payload() id:string){
    return this.warehouseService.deleteWarehouse(id);
  };

  @MessagePattern({cmd:"zone.create"})
  async createZone(@Payload() dto:CreateZoneDto){
    return this.warehouseService.createZone(dto);
  };


   @MessagePattern({ cmd: 'zone.findByWarehouse' })
  async findZonesByWarehouse(@Payload() warehouseId: string) {
    return this.warehouseService.findZonesByWarehouse(warehouseId);
  }

  @MessagePattern({ cmd: 'zone.findOne' })
  async findZoneById(@Payload() id: string) {
    return this.warehouseService.findZoneById(id);
  }

  @MessagePattern({ cmd: 'zone.update' })
  async updateZone(@Payload() payload: { id: string } & UpdateZoneDto) {
    const { id, ...dto } = payload;
    return this.warehouseService.updateZone(id, dto);
  }

  @MessagePattern({ cmd: 'zone.delete' })
  async deleteZone(@Payload() id: string) {
    return this.warehouseService.deleteZone(id);
  }

  // Location
  @MessagePattern({ cmd: 'location.create' })
  async createLocation(@Payload() dto: CreateLocationDto) {
    return this.warehouseService.createLocation(dto);
  }

  @MessagePattern({ cmd: 'location.findByZone' })
  async findLocationsByZone(@Payload() zoneId: string) {
    return this.warehouseService.findLocationsByZone(zoneId);
  }

  @MessagePattern({ cmd: 'location.findOne' })
  async findLocationById(@Payload() id: string) {
    return this.warehouseService.findLocationById(id);
  }

  @MessagePattern({ cmd: 'location.update' })
  async updateLocation(@Payload() payload: { id: string } & UpdateLocationDto) {
    const { id, ...dto } = payload;
    return this.warehouseService.updateLocation(id, dto);
  }

  @MessagePattern({ cmd: 'location.delete' })
  async deleteLocation(@Payload() id: string) {
    return this.warehouseService.deleteLocation(id);
  }
}
