import { Request, Response, NextFunction } from "express";
import { GeneralError } from "../utils/classError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof GeneralError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.code,
      message: err.message,
    });
  }

  console.error("Unhandled Error:", err);
  
  return res.status(500).json({
    success: false,
    error: "INTERNAL_ERROR",
    message: "An internal server error occurred",
  });
};
