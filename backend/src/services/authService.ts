import { AppDataSource } from "../config/database";
import { User } from "../models/User";
import { NotFoundError, AuthError } from "../utils/classError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async login(email: string, passwordString: string) {
    const user = await this.userRepository.findOneBy({ email });
    
    if (!user) {
      throw new AuthError("Credenciales inválidas");
    }

    const isValid = await bcrypt.compare(passwordString, user.password);
    if (!isValid) {
      throw new AuthError("Credenciales inválidas");
    }

    const token = jwt.sign(
      { id: user.id, rut: user.rut, email: user.email },
      process.env.JWT_SECRET || "ventasfix_secret_key_2026",
      { expiresIn: "8h" }
    );

    return {
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email
      },
      token
    };
  }
}
