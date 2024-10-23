import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @Matches(/^\S*$/, { message: 'El nombre no puede contener espacios en blanco' })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Ingrese un email válido' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/^(?=.*[0-9])/, { message: 'La contraseña debe contener al menos un número' })
  readonly password: string;
}