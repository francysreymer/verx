import { Entity, PrimaryGeneratedColumn, Column, IntegerType } from 'typeorm';

export enum CropType {
  Soja = 'Soja',
  Milho = 'Milho',
  Algodao = 'Algodão',
  Cafe = 'Café',
  CanaDeAcucar = 'Cana de Açúcar',
}

@Entity('farms')
export class Farm {
  @PrimaryGeneratedColumn()
  id!: IntegerType;

  @Column({ length: 18 })
  document: string;

  @Column()
  producer_name!: string;

  @Column()
  farm_name!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column('numeric')
  total_area!: number;

  @Column('numeric', { nullable: true })
  cultivable_area?: number;

  @Column('numeric', { nullable: true })
  vegetation_area?: number;

  @Column('enum', { array: true, enum: CropType })
  crops!: CropType[];
}
