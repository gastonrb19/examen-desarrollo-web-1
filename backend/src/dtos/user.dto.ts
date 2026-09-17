import { IsEmail, IsNotEmpty, IsString, Matches, MinLength, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "El rut es obligatorio" })
  rut!: string;

  @IsString()
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  nombre!: string;

  @IsString()
  @IsNotEmpty({ message: "El apellido es obligatorio" })
  apellido!: string;

  @IsEmail({}, { message: "Email inválido" })
  @Matches(/@ventasfix\.cl$/, { message: "El email debe ser del dominio @ventasfix.cl" })
  @IsNotEmpty({ message: "El email es obligatorio" })
  email!: string;

  @IsString()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  password!: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  rut?: string;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsEmail({}, { message: "Email inválido" })
  @Matches(/@ventasfix\.cl$/, { message: "El email debe ser del dominio @ventasfix.cl" })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password?: string;
}
