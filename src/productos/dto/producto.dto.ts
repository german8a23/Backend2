import { IsString, IsOptional, MinLength, IsNumber, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ProductoDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  readonly nombre: string;

  @ApiProperty()
  @IsNumber({}, { message: 'El stock debe ser un número.' })
  @Min(1, { message: 'El stock debe ser mayor que 0' })
  @Type(() => Number)
  readonly stock: number;

  @ApiProperty()
  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @Min(0.01, { message: 'El precio debe ser mayor que 0.' })
  @Type(() => Number)
  readonly precio: number;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  readonly foto: Express.Multer.File;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  @MinLength(3, { message: 'La categoría debe tener al menos 3 caracteres.' })
  readonly categoria: string;
}

















// import { IsString, IsOptional } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// import { Express } from 'express';

// export class ProductoDTO {
//   @ApiProperty()
//   readonly id: number;

//   @ApiProperty()
//   @IsString()
//   readonly nombre: string;

//   @ApiProperty()
//   @IsString()
//   readonly stock: string;

//   @ApiProperty()
//   @IsString()
//   readonly precio: string;

//   @ApiProperty({ type: 'string' })
//   @IsOptional()
//   readonly foto: Express.Multer.File;

//   @ApiProperty()
//   @IsString()
//   readonly categoria: string;
// }

