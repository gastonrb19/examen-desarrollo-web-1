export class GeneralError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode = 500, code = "SVR_ERR") {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class NotFoundError extends GeneralError {
  constructor(resourceName: string, identifier: string | number) {
    super(
      `Resource (${resourceName}) not found with identifier (${identifier})`,
      404,
      "NOT_FOUND"
    );
  }
}

export class ValidationError extends GeneralError {
  constructor(message: string) {
    super(message, 400, "VALIDATION_ERR");
  }
}

export class AuthError extends GeneralError {
  constructor(message: string = "Unauthorized") {
    super(message, 401, "AUTH_ERR");
  }
}
