import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// apps/auth-service/src/config/database.config.ts
export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '200405',
  database: process.env.DB_NAME || 'WarehouseDb',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true, // ← true qiling
  logging: process.env.NODE_ENV === 'development',
});