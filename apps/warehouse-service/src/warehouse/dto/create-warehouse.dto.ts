import { IsNotEmpty, IsString } from "class-validator";


export class CreateWarehouseDto{

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    address:string;


}


export class CreateZoneDto{

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    warehouseId:string;

}


export class CreateLocationDto{

    @IsString()
    @IsNotEmpty()
    name:string;


    @IsString()
    @IsNotEmpty()
    zoneId:string;
    
}