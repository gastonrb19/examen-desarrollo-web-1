import { AppDataSource } from "../config/database";
import { User } from "../models/User";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { NotFoundError, ValidationError } from "../utils/classError";
import bcrypt from "bcrypt";

export class UserService {
  private repository = AppDataSource.getRepository(User);

  async findAll() {
    return await this.repository.find({ 
      select: { id: true, rut: true, nombre: true, apellido: true, email: true, createdAt: true } 
    });
  }

  async findOne(id: number) {
    const user = await this.repository.findOne({ 
      where: { id }, 
      select: { id: true, rut: true, nombre: true, apellido: true, email: true, createdAt: true } 
    });
    if (!user) throw new NotFoundError("User", id);
    return user;
  }

  async create(data: CreateUserDto) {
    const exists = await this.repository.findOneBy({ email: data.email });
    if (exists) throw new ValidationError("El email ya está registrado");

    const rutExists = await this.repository.findOneBy({ rut: data.rut });
    if (rutExists) throw new ValidationError("El RUT ya está registrado");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = this.repository.create({ ...data, password: hashedPassword });
    const saved = await this.repository.save(newUser);
    const { password, ...result } = saved;
    return result;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundError("User", id);

    if (data.email && data.email !== user.email) {
      const exists = await this.repository.findOneBy({ email: data.email });
      if (exists) throw new ValidationError("El email ya está registrado");
    }

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    Object.assign(user, data);
    const saved = await this.repository.save(user);
    const { password, ...result } = saved;
    return result;
  }

  async delete(id: number) {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundError("User", id);
    await this.repository.remove(user);
    return { message: "User deleted successfully" };
  }
}
