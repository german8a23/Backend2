// export class Producto {}
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;


  @Column('int')
  stock: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ nullable: true })
  foto: Express.Multer.File;

  @Column()
  categoria: string;

  // @Column()
  // descripcion: string;
}