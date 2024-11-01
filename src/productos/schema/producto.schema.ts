import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductoDocument = Producto & Document;

@Schema()
export class Producto {
  @Prop({ unique: true })
  id: number;

  @Prop({ required: true, minlength: 3 })
  nombre: string;

  @Prop({ required: true, min: 1 })
  stock: number;

  @Prop({ required: true, min: 0.01 })
  precio: number;

  @Prop({ type: Object })
  foto: Express.Multer.File;

  @Prop({ required: true })
  categoria: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);