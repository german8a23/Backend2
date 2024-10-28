import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Producto } from './schema/producto.schema';
import { ProductoDTO } from './dto/producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel('Producto') private readonly productoModel: Model<Producto>,
  ) {}

  async crearProducto(productoDTO: ProductoDTO, foto: Express.Multer.File | undefined): Promise<Producto> {
    if (productoDTO.nombre.trim().length < 3) {
      throw new BadRequestException('El nombre debe tener al menos 3 caracteres');
    }

    if (productoDTO.nombre && /\d/.test(productoDTO.nombre)) {
      throw new BadRequestException('El nombre no debe contener números');
    }

    if (Number(productoDTO.stock) <= 0) {
      throw new BadRequestException('El stock debe ser mayor a 0');
    }
    if (Number(productoDTO.precio) <= 0) {
      throw new BadRequestException('El precio debe ser mayor a 0');
    }


    const count = await this.productoModel.countDocuments().exec();
    const nuevoProducto = new this.productoModel({
      id: count + 1,
      nombre: productoDTO.nombre.trim(),
      stock: Number(productoDTO.stock),
      precio: Number(productoDTO.precio),
      foto: productoDTO.foto,
      categoria: productoDTO.categoria.trim(),
    });
  
    const savedProducto = await nuevoProducto.save();
    return savedProducto;
  }

  async obtenerProductos(): Promise<Producto[]> {
    return this.productoModel.find().exec();
  }


  async obtenerProductoPorId(id: string): Promise<Producto> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID de producto inválido');
    }
    const producto = await this.productoModel.findById(id).exec();
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto;
  }

  async actualizarProducto(
    id: string,
    productoDTO: ProductoDTO,
    foto: Express.Multer.File | undefined,
  ): Promise<Producto> {
    if (productoDTO.nombre.trim().length < 3) {
      throw new BadRequestException('El nombre debe tener al menos 3 caracteres');
    }

    if (productoDTO.nombre && /\d/.test(productoDTO.nombre)) {
      throw new BadRequestException('El nombre no debe contener números');
    }

    if (Number(productoDTO.stock) <= 0) {
      throw new BadRequestException('El stock debe ser mayor a 0');
    }
    if (Number(productoDTO.precio) <= 0) {
      throw new BadRequestException('El precio debe ser mayor a 0');
    }


    const updatedProducto: Partial<Producto> = {
      nombre: productoDTO.nombre.trim(),
      stock: Number(productoDTO.stock),
      precio: Number(productoDTO.precio),
      foto: productoDTO.foto,
      categoria: productoDTO.categoria.trim()
    };


    return this.productoModel.findByIdAndUpdate(id, updatedProducto, {
      new: true,
    });
  }

  async eliminarProducto(id: string): Promise<Producto> {
    return this.productoModel.findByIdAndRemove(id);
  }

  async buscarProductos(filtro: string): Promise<Producto[]> {
    const productos = await this.productoModel
      .find({
        $or: [
          { nombre: { $regex: filtro, $options: 'i' } },
          { categoria: { $regex: filtro, $options: 'i' } },
        ],
      })
      .exec();
    return productos;
  }
}