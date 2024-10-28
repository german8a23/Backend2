import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Ingrese un email válido' })
  readonly email: string;

  @IsNotEmpty({ message: 'No se permiten espacios en blnaco' })
  @IsString()
  readonly password: string;
}