import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GatewayCreateWarehouseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export class GatewayUpdateWarehouseDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class GatewayCreateZoneDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  warehouseId: string;
}

export class GatewayUpdateZoneDto {
  @IsString()
  @IsOptional()
  name?: string;
}

export class GatewayCreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  zoneId: string;
}

export class GatewayUpdateLocationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  isOccupied?: boolean;
}