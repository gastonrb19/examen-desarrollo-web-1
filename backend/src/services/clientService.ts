import { AppDataSource } from "../config/database";
import { Client } from "../models/Client";
import { CreateClientDto, UpdateClientDto } from "../dtos/client.dto";
import { NotFoundError, ValidationError } from "../utils/classError";

export class ClientService {
  private repository = AppDataSource.getRepository(Client);

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const client = await this.repository.findOneBy({ id });
    if (!client) throw new NotFoundError("Client", id);
    return client;
  }

  async create(data: CreateClientDto) {
    const exists = await this.repository.findOneBy({ rutEmpresa: data.rutEmpresa });
    if (exists) throw new ValidationError("El RUT de empresa ya está registrado");

    const newClient = this.repository.create(data);
    return await this.repository.save(newClient);
  }

  async update(id: number, data: UpdateClientDto) {
    const client = await this.repository.findOneBy({ id });
    if (!client) throw new NotFoundError("Client", id);

    if (data.rutEmpresa && data.rutEmpresa !== client.rutEmpresa) {
      const exists = await this.repository.findOneBy({ rutEmpresa: data.rutEmpresa });
      if (exists) throw new ValidationError("El RUT de empresa ya está registrado");
    }

    Object.assign(client, data);
    return await this.repository.save(client);
  }

  async delete(id: number) {
    const client = await this.repository.findOneBy({ id });
    if (!client) throw new NotFoundError("Client", id);
    await this.repository.remove(client);
    return { message: "Client deleted successfully" };
  }
}
