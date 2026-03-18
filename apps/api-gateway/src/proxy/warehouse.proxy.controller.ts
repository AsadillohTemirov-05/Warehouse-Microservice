import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SERVICE_NAMES, Roles, Role } from '@wms/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import {
  GatewayCreateWarehouseDto,
  GatewayUpdateWarehouseDto,
  GatewayCreateZoneDto,
  GatewayUpdateZoneDto,
  GatewayCreateLocationDto,
  GatewayUpdateLocationDto,
} from './dto/warehouse.dto';

@ApiTags('warehouse')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('warehouses')
export class WarehouseProxyController {
  constructor(
    @Inject(SERVICE_NAMES.WAREHOUSE)
    private readonly warehouseClient: ClientProxy,
  ) {}

  // Warehouse
  @ApiOperation({ summary: 'Barcha omborlarni olish' })
  @Get()
  async findAllWarehouses() {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'warehouse.findAll' }, {}),
    );
  }

  @ApiOperation({ summary: 'Ombor yaratish' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @Post()
  async createWarehouse(@Body() dto: GatewayCreateWarehouseDto) {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'warehouse.create' }, dto),
    );
  }

  @ApiOperation({ summary: 'Omborni ID bo\'yicha olish' })
  @Get(':id')
  async findWarehouseById(@Param('id') id: string) {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'warehouse.findOne' }, id),
    );
  }

  @ApiOperation({ summary: 'Omborni yangilash' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @Put(':id')
  async updateWarehouse(
    @Param('id') id: string,
    @Body() dto: GatewayUpdateWarehouseDto,
  ) {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'warehouse.update' }, { id, ...dto }),
    );
  }

  @ApiOperation({ summary: 'Omborni o\'chirish' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteWarehouse(@Param('id') id: string) {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'warehouse.delete' }, id),
    );
  }

  // Zone
  @ApiOperation({ summary: 'Zona yaratish' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @Post('zones')
  async createZone(@Body() dto: GatewayCreateZoneDto) {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'zone.create' }, dto),
    );
  }

  @ApiOperation({ summary: 'Warehouse zonalarini olish' })
  @Get(':warehouseId/zones')
  async findZonesByWarehouse(@Param('warehouseId') warehouseId: string) {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'zone.findByWarehouse' }, warehouseId),
    );
  }

  @ApiOperation({ summary: 'Zonani yangilash' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @Put('zones/:id')
  async updateZone(
    @Param('id') id: string,
    @Body() dto: GatewayUpdateZoneDto,
  ) {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'zone.update' }, { id, ...dto }),
    );
  }

  @ApiOperation({ summary: 'Zonani o\'chirish' })
  @Roles(Role.ADMIN)
  @Delete('zones/:id')
  async deleteZone(@Param('id') id: string) {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'zone.delete' }, id),
    );
  }

  // Location
  @ApiOperation({ summary: 'Lokatsiya yaratish' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @Post('locations')
  async createLocation(@Body() dto: GatewayCreateLocationDto) {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'location.create' }, dto),
    );
  }

  @ApiOperation({ summary: 'Zona lokatsiyalarini olish' })
  @Get('zones/:zoneId/locations')
  async findLocationsByZone(@Param('zoneId') zoneId: string) {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'location.findByZone' }, zoneId),
    );
  }

  @ApiOperation({ summary: 'Lokatsiyani yangilash' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @Put('locations/:id')
  async updateLocation(
    @Param('id') id: string,
    @Body() dto: GatewayUpdateLocationDto,
  ) {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'location.update' }, { id, ...dto }),
    );
  }

  @ApiOperation({ summary: 'Lokatsiyani o\'chirish' })
  @Roles(Role.ADMIN)
  @Delete('locations/:id')
  async deleteLocation(@Param('id') id: string) {
    return firstValueFrom(
      this.warehouseClient.send({ cmd: 'location.delete' }, id),
    );
  }
}