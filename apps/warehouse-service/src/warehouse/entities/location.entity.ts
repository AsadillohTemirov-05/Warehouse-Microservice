import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Zone } from './zone.entity';

@Entity('locations')
export class WarehouseLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'zone_id' })
  zoneId: string;

  @Column({ name: 'is_occupied', default: false })
  isOccupied: boolean;

  @ManyToOne(() => Zone, (zone) => zone.locations)
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}