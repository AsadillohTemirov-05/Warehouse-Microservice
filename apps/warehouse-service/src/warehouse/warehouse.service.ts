import { Injectable, NotFoundException } from '@nestjs/common';
import { WarehouseRepository } from './warehouse.repository';
import { CreateLocationDto, CreateWarehouseDto, CreateZoneDto } from './dto/create-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';
import { Zone } from './entities/zone.entity';
import { WarehouseLocation } from './entities/location.entity';
import { UpdateLocationDto, UpdateWarehouseDto, UpdateZoneDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(private readonly warehouseRepository: WarehouseRepository) {}

  // Warehouse
  async createWarehouse(dto: CreateWarehouseDto): Promise<Warehouse> {
    return this.warehouseRepository.createWarehouse(dto);
  }

  async findAllWarehouses(): Promise<Warehouse[]> {
    return this.warehouseRepository.findAllWarehouses();
  }

  async findWarehouseById(id: string): Promise<Warehouse> {
    const warehouse = await this.warehouseRepository.findWarehouseById(id);
    if (!warehouse) {
      throw new NotFoundException('Warehouse Not Found');
    }
    return warehouse;
  }

  async updateWarehouse(id: string, dto: UpdateWarehouseDto): Promise<Warehouse> {
    await this.findWarehouseById(id);
    const updated = await this.warehouseRepository.updateWarehouse(id, dto);
    if (!updated) {
      throw new NotFoundException('Ombor');
    }
    return updated;
  }

  async deleteWarehouse(id: string): Promise<void> {
    await this.findWarehouseById(id);
    await this.warehouseRepository.deleteWarehouse(id);
  }

  // Zone
  async createZone(dto: CreateZoneDto): Promise<Zone> {
    await this.findWarehouseById(dto.warehouseId);
    return this.warehouseRepository.createZone(dto);
  }

  async findZonesByWarehouse(warehouseId: string): Promise<Zone[]> {
    await this.findWarehouseById(warehouseId);
    return this.warehouseRepository.findZonesByWarehouse(warehouseId);
  }

  async findZoneById(id: string): Promise<Zone> {
    const zone = await this.warehouseRepository.findZoneById(id);
    if (!zone) {
      throw new NotFoundException('Zona');
    }
    return zone;
  }

  async updateZone(id: string, dto: UpdateZoneDto): Promise<Zone> {
    await this.findZoneById(id);
    const updated = await this.warehouseRepository.updateZone(id, dto);
    if (!updated) {
      throw new NotFoundException('Zona');
    }
    return updated;
  }

  async deleteZone(id: string): Promise<void> {
    await this.findZoneById(id);
    await this.warehouseRepository.deleteZone(id);
  }

  // Location
  async createLocation(dto: CreateLocationDto): Promise<WarehouseLocation> {
    await this.findZoneById(dto.zoneId);
    return this.warehouseRepository.createLocation(dto);
  }

  async findLocationsByZone(zoneId: string): Promise<WarehouseLocation[]> {
    await this.findZoneById(zoneId);
    return this.warehouseRepository.findLocationsByZone(zoneId);
  }

  async findLocationById(id: string): Promise<WarehouseLocation> {
    const location = await this.warehouseRepository.findLocationById(id);
    if (!location) {
      throw new NotFoundException('Lokatsiya');
    }
    return location;
  }

  async updateLocation(id: string, dto: UpdateLocationDto): Promise<WarehouseLocation> {
    await this.findLocationById(id);
    const updated = await this.warehouseRepository.updateLocation(id, dto);
    if (!updated) {
      throw new NotFoundException('Lokatsiya');
    }
    return updated;
  }

  async deleteLocation(id: string): Promise<void> {
    await this.findLocationById(id);
    await this.warehouseRepository.deleteLocation(id);
  }
}