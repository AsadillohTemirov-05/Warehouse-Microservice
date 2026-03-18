import { IsBoolean, IsOptional, IsString } from "class-validator";



export class UpdateWarehouseDto{

    @IsString()
    @IsOptional()
    name?:string;



    @IsString()
    @IsOptional()
    address?:string;



    @IsBoolean()
    @IsOptional()
    isActive?:boolean;
}


export class UpdateZoneDto {
  @IsString()
  @IsOptional()
  name?: string;
}

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  isOccupied?: boolean;
}