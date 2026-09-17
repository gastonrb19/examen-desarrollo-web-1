import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: "El SKU es obligatorio" })
  sku!: string;

  @IsString()
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  nombre!: string;

  @IsString()
  @IsNotEmpty({ message: "La descripción corta es obligatoria" })
  descCorta!: string;

  @IsString()
  @IsNotEmpty({ message: "La descripción larga es obligatoria" })
  descLarga!: string;

  @IsString()
  @IsNotEmpty({ message: "La imagen es obligatoria" })
  imagen!: string;

  @IsNumber()
  @Min(0, { message: "El precio neto debe ser mayor o igual a 0" })
  @IsNotEmpty({ message: "El precio neto es obligatorio" })
  precioNeto!: number;

  @IsInt()
  @Min(0, { message: "El stock debe ser mayor o igual a 0" })
  @IsNotEmpty({ message: "El stock actual es obligatorio" })
  stockActual!: number;

  @IsInt()
  @Min(0, { message: "El stock mínimo debe ser mayor o igual a 0" })
  @IsNotEmpty({ message: "El stock mínimo es obligatorio" })
  stockMinimo!: number;

  @IsInt()
  @Min(0, { message: "El stock bajo debe ser mayor o igual a 0" })
  @IsNotEmpty({ message: "El stock bajo es obligatorio" })
  stockBajo!: number;

  @IsInt()
  @Min(0, { message: "El stock alto debe ser mayor o igual a 0" })
  @IsNotEmpty({ message: "El stock alto es obligatorio" })
  stockAlto!: number;
}

export class UpdateProductDto {
  @IsString()
  sku?: string;

  @IsString()
  nombre?: string;

  @IsString()
  descCorta?: string;

  @IsString()
  descLarga?: string;

  @IsString()
  imagen?: string;

  @IsNumber()
  @Min(0)
  precioNeto?: number;

  @IsInt()
  @Min(0)
  stockActual?: number;

  @IsInt()
  @Min(0)
  stockMinimo?: number;

  @IsInt()
  @Min(0)
  stockBajo?: number;

  @IsInt()
  @Min(0)
  stockAlto?: number;
}
