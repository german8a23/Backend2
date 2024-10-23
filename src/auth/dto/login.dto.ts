import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Ingrese un email válido' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}