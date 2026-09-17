import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthError } from "../utils/classError";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AuthError("No token provided or invalid format"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "ventasfix_secret_key_2026");
    (req as any).user = decoded; // Attach user payload to request
    next();
  } catch (err) {
    return next(new AuthError("Invalid or expired token"));
  }
};
