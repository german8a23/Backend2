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
    if (productoDTO.categoria.trim().length < 3) {
      throw new BadRequestException('La categoría debe tener al menos 3 caracteres');
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

  // async obtenerProductoPorId(id: string): Promise<Producto> {
  //   return this.productoModel.findById(id).exec();
  // }

  async actualizarProducto(
    id: string,
    productoDTO: ProductoDTO,
    foto: Express.Multer.File | undefined,
  ): Promise<Producto> {
    if (productoDTO.nombre && productoDTO.nombre.trim().length < 3) {
      throw new BadRequestException('El nombre debe tener al menos 3 caracteres');
    }
    if (productoDTO.categoria && productoDTO.categoria.trim().length < 3) {
      throw new BadRequestException('La categoría debe tener al menos 3 caracteres');
    }
    if (productoDTO.stock && Number(productoDTO.stock) <= 0) {
      throw new BadRequestException('El stock debe ser mayor a 0');
    }
    if (productoDTO.precio && Number(productoDTO.precio) <= 0) {
      throw new BadRequestException('El precio debe ser mayor a 0');
    }

    const updatedProducto: Partial<Producto> = {
      nombre: productoDTO.nombre ? productoDTO.nombre.trim() : undefined,
      stock: productoDTO.stock ? Number(productoDTO.stock) : undefined,
      precio: productoDTO.precio ? Number(productoDTO.precio) : undefined,
      categoria: productoDTO.categoria ? productoDTO.categoria.trim() : undefined,
    };

    if (foto) {
      updatedProducto.foto = { filename: foto.filename } as Express.Multer.File;
    }

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















// import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { isValidObjectId, Model } from 'mongoose';
// import { Producto } from './schema/producto.schema';
// import { ProductoDTO } from './dto/producto.dto';

// @Injectable()
// export class ProductosService {
//   constructor(
//     @InjectModel('Producto') private readonly productoModel: Model<Producto>,
//   ) {}

//   async crearProducto(productoDTO: ProductoDTO): Promise<Producto> {
//     if (productoDTO.nombre.trim().length < 3) {
//       throw new BadRequestException('El nombre debe tener al menos 3 caracteres');
//     }
//     if (productoDTO.categoria.trim().length < 3) {
//       throw new BadRequestException('La categoría debe tener al menos 3 caracteres');
//     }
//     if (Number(productoDTO.stock) <= 0) {
//       throw new BadRequestException('El stock debe ser mayor a 0');
//     }
//     if (Number(productoDTO.precio) <= 0) {
//       throw new BadRequestException('El precio debe ser mayor a 0');
//     }

//     const count = await this.productoModel.countDocuments().exec();
//     const nuevoProducto = new this.productoModel({
//       id: count + 1,
//       nombre: productoDTO.nombre.trim(),
//       stock: Number(productoDTO.stock),
//       precio: Number(productoDTO.precio),
//       foto: productoDTO.foto, // Base64 string
//       categoria: productoDTO.categoria.trim(),
//     });
  
//     const savedProducto = await nuevoProducto.save();
//     return savedProducto;
//   }

//   async obtenerProductos(): Promise<Producto[]> {
//     return this.productoModel.find().exec();
//   }

//   async obtenerProductoPorId(id: string): Promise<Producto> {
//     if (!isValidObjectId(id)) {
//       throw new BadRequestException('ID de producto inválido');
//     }
//     const producto = await this.productoModel.findById(id).exec();
//     if (!producto) {
//       throw new NotFoundException('Producto no encontrado');
//     }
//     return producto;
//   }

//   async actualizarProducto(id: string, productoDTO: ProductoDTO): Promise<Producto> {
//     if (productoDTO.nombre && productoDTO.nombre.trim().length < 3) {
//       throw new BadRequestException('El nombre debe tener al menos 3 caracteres');
//     }
//     if (productoDTO.categoria && productoDTO.categoria.trim().length < 3) {
//       throw new BadRequestException('La categoría debe tener al menos 3 caracteres');
//     }
//     if (productoDTO.stock && Number(productoDTO.stock) <= 0) {
//       throw new BadRequestException('El stock debe ser mayor a 0');
//     }
//     if (productoDTO.precio && Number(productoDTO.precio) <= 0) {
//       throw new BadRequestException('El precio debe ser mayor a 0');
//     }

//     const updatedProducto: Partial<Producto> = {
//       nombre: productoDTO.nombre ? productoDTO.nombre.trim() : undefined,
//       stock: productoDTO.stock ? Number(productoDTO.stock) : undefined,
//       precio: productoDTO.precio ? Number(productoDTO.precio) : undefined,
//       foto: productoDTO.foto, // Base64 string
//       categoria: productoDTO.categoria ? productoDTO.categoria.trim() : undefined,
//     };

//     return this.productoModel.findByIdAndUpdate(id, updatedProducto, {
//       new: true,
//     });
//   }

//   async eliminarProducto(id: string): Promise<Producto> {
//     return this.productoModel.findByIdAndRemove(id);
//   }

//   async buscarProductos(filtro: string): Promise<Producto[]> {
//     const productos = await this.productoModel
//       .find({
//         $or: [
//           { nombre: { $regex: filtro, $options: 'i' } },
//           { categoria: { $regex: filtro, $options: 'i' } },
//         ],
//       })
//       .exec();
//     return productos;
//   }
// }


















// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Producto } from './schema/producto.schema';
// import { ProductoDTO } from './dto/create-producto.dto';

// @Injectable()
// export class ProductosService {
//   constructor(
//     @InjectModel('Producto') private readonly productoModel: Model<Producto>,
//   ) {}


//   async crearProducto(productoDTO: ProductoDTO, foto: Express.Multer.File | undefined): Promise<Producto> {
//     const count = await this.productoModel.countDocuments().exec();
//     const nuevoProducto = new this.productoModel({
//       id: count + 1,
//       nombre: productoDTO.nombre,
//       stock: productoDTO.stock,
//       precio: productoDTO.precio,
//       foto: productoDTO.foto,
//       categoria: productoDTO.categoria,
//     });
  
//     const savedProducto = await nuevoProducto.save();
  
//     return savedProducto;
//   }

//   async obtenerProductos(): Promise<Producto[]> {
//     return this.productoModel.find().exec();
//   }

//   async obtenerProductoPorId(id: string): Promise<Producto> {
//     return this.productoModel.findById(id).exec();
//   }

//   async actualizarProducto(
//     id: string,
//     productoDTO: ProductoDTO,
//     foto: Express.Multer.File | undefined,
//   ): Promise<Producto> {
//     const updatedProducto: Partial<Producto> = { ...productoDTO };
//     if (foto) {
//       updatedProducto.foto = { filename: foto.filename } as Express.Multer.File;
//     }
//     return this.productoModel.findByIdAndUpdate(id, updatedProducto, {
//       new: true,
//     });
//   }


//   async eliminarProducto(id: string): Promise<Producto> {
//     return this.productoModel.findByIdAndRemove(id);
//   }

//   async buscarProductos(filtro: string): Promise<Producto[]> {
//     const productos = await this.productoModel
//       .find({
//         $or: [
//           { nombre: { $regex: filtro, $options: 'i' } },
//           { categoria: { $regex: filtro, $options: 'i' } },
//         ],
//       })
//       .exec();
//     return productos;
//   }
// }
