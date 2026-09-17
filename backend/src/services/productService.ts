import { AppDataSource } from "../config/database";
import { Product } from "../models/Product";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";
import { NotFoundError, ValidationError } from "../utils/classError";

export class ProductService {
  private repository = AppDataSource.getRepository(Product);

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const product = await this.repository.findOneBy({ id });
    if (!product) throw new NotFoundError("Product", id);
    return product;
  }

  async create(data: CreateProductDto) {
    const exists = await this.repository.findOneBy({ sku: data.sku });
    if (exists) throw new ValidationError("El SKU ya está registrado");

    // Calcular precioVenta = precioNeto * 1.19
    const precioVenta = data.precioNeto * 1.19;

    const newProduct = this.repository.create({ ...data, precioVenta });
    return await this.repository.save(newProduct);
  }

  async update(id: number, data: UpdateProductDto) {
    const product = await this.repository.findOneBy({ id });
    if (!product) throw new NotFoundError("Product", id);

    if (data.sku && data.sku !== product.sku) {
      const exists = await this.repository.findOneBy({ sku: data.sku });
      if (exists) throw new ValidationError("El SKU ya está registrado");
    }

    Object.assign(product, data);
    
    // Recalcular precioVenta si se actualiza el precioNeto
    if (data.precioNeto !== undefined) {
      product.precioVenta = data.precioNeto * 1.19;
    }

    return await this.repository.save(product);
  }

  async delete(id: number) {
    const product = await this.repository.findOneBy({ id });
    if (!product) throw new NotFoundError("Product", id);
    await this.repository.remove(product);
    return { message: "Product deleted successfully" };
  }
}
