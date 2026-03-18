import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Zone } from './entities/zone.entity';
import { WarehouseLocation } from './entities/location.entity';
import { CreateWarehouseDto, CreateZoneDto, CreateLocationDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto, UpdateZoneDto, UpdateLocationDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehouseRepository {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepo: Repository<Warehouse>,

    @InjectRepository(Zone)
    private readonly zoneRepo: Repository<Zone>,

    @InjectRepository(WarehouseLocation)
    private readonly locationRepo: Repository<WarehouseLocation>,
  ) {}

  // Warehouse
  async createWarehouse(dto: CreateWarehouseDto): Promise<Warehouse> {
    const warehouse = this.warehouseRepo.create(dto);
    return this.warehouseRepo.save(warehouse);
  }

  async findAllWarehouses(): Promise<Warehouse[]> {
    return this.warehouseRepo.find({ relations: ['zones'] });
  }

  async findWarehouseById(id: string): Promise<Warehouse | null> {
    return this.warehouseRepo.findOne({
      where: { id },
      relations: ['zones', 'zones.locations'],
    });
  }

  async updateWarehouse(id: string, dto: UpdateWarehouseDto): Promise<Warehouse | null> {
    await this.warehouseRepo.update(id, dto);
    return this.findWarehouseById(id);
  }

  async deleteWarehouse(id: string): Promise<void> {
    await this.warehouseRepo.delete(id);
  }

  // Zone
  async createZone(dto: CreateZoneDto): Promise<Zone> {
    const zone = this.zoneRepo.create(dto);
    return this.zoneRepo.save(zone);
  }

  async findZonesByWarehouse(warehouseId: string): Promise<Zone[]> {
    return this.zoneRepo.find({
      where: { warehouseId },
      relations: ['locations'],
    });
  }

  async findZoneById(id: string): Promise<Zone | null> {
    return this.zoneRepo.findOne({
      where: { id },
      relations: ['locations'],
    });
  }

  async updateZone(id: string, dto: UpdateZoneDto): Promise<Zone | null> {
    await this.zoneRepo.update(id, dto);
    return this.findZoneById(id);
  }

  async deleteZone(id: string): Promise<void> {
    await this.zoneRepo.delete(id);
  }

  // Location
  async createLocation(dto: CreateLocationDto): Promise<WarehouseLocation> {
    const location = this.locationRepo.create(dto);
    return this.locationRepo.save(location);
  }

  async findLocationsByZone(zoneId: string): Promise<WarehouseLocation[]> {
    return this.locationRepo.find({ where: { zoneId } });
  }

  async findLocationById(id: string): Promise<WarehouseLocation | null> {
    return this.locationRepo.findOne({ where: { id } });
  }

  async updateLocation(id: string, dto: UpdateLocationDto): Promise<WarehouseLocation | null> {
    await this.locationRepo.update(id, dto);
    return this.findLocationById(id);
  }

  async deleteLocation(id: string): Promise<void> {
    await this.locationRepo.delete(id);
  }
}