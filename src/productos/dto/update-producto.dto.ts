import { PartialType } from '@nestjs/swagger';
import { ProductoDTO } from './producto.dto';

export class UpdateProductoDto extends PartialType(ProductoDTO) {}
