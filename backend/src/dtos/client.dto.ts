import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateClientDto {
  @IsString()
  @IsNotEmpty({ message: "El RUT de la empresa es obligatorio" })
  rutEmpresa!: string;

  @IsString()
  @IsNotEmpty({ message: "El rubro es obligatorio" })
  rubro!: string;

  @IsString()
  @IsNotEmpty({ message: "La razón social es obligatoria" })
  razonSocial!: string;

  @IsString()
  @IsNotEmpty({ message: "El teléfono es obligatorio" })
  telefono!: string;

  @IsString()
  @IsNotEmpty({ message: "La dirección es obligatoria" })
  direccion!: string;

  @IsString()
  @IsNotEmpty({ message: "El nombre de contacto es obligatorio" })
  nombreContacto!: string;

  @IsEmail({}, { message: "El email de contacto es inválido" })
  @IsNotEmpty({ message: "El email de contacto es obligatorio" })
  emailContacto!: string;
}

export class UpdateClientDto {
  @IsString()
  rutEmpresa?: string;

  @IsString()
  rubro?: string;

  @IsString()
  razonSocial?: string;

  @IsString()
  telefono?: string;

  @IsString()
  direccion?: string;

  @IsString()
  nombreContacto?: string;

  @IsEmail()
  emailContacto?: string;
}
