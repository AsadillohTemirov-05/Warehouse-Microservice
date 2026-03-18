import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { WarehouseLocation } from './location.entity';

@Entity('zones')
export class Zone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'warehouse_id' })
  warehouseId: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.zones)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @OneToMany(() => WarehouseLocation, (location) => location.zone)
  locations: WarehouseLocation[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}