import { TypeOrmModuleOptions } from "@nestjs/typeorm";



export const databaseConfig=():TypeOrmModuleOptions=>({

    type:'postgres',
    host:process.env.DB_HOST||'localhost',
    port:parseInt(process.env.DB_USERNAME||'postgres'),
    username:process.env.DB_PASSWORD||'200405',
    database:process.env.DB_NAME||'WarehouseDb',
     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
})