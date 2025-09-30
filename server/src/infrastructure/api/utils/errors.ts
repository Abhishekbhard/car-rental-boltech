export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    errorCode: string = "INTERNAL_ERROR",
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, "NOT_FOUND");
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, "CONFLICT");
  }
}

export class CarNotFoundError extends AppError {
  constructor(carId: string) {
    super(`Car with ID '${carId}' not found`, 404, "CAR_NOT_FOUND");
  }
}

export class UserNotFoundError extends AppError {
  constructor(userId: string) {
    super(`User with ID '${userId}' not found`, 404, "USER_NOT_FOUND");
  }
}

export class CarNotAvailableError extends AppError {
  constructor(carId: string, startDate: string, endDate: string) {
    super(
      `Car '${carId}' is not available for the period ${startDate} to ${endDate}`,
      409,
      "CAR_NOT_AVAILABLE"
    );
  }
}

export class UserBookingConflictError extends AppError {
  constructor(userId: string, startDate: string, endDate: string) {
    super(
      `User '${userId}' already has a booking during the period ${startDate} to ${endDate}`,
      409,
      "USER_BOOKING_CONFLICT"
    );
  }
}

export class InvalidDateRangeError extends AppError {
  constructor(
    message: string = "Invalid date range: end date must be after start date"
  ) {
    super(message, 400, "INVALID_DATE_RANGE");
  }
}

export class BookingNotFoundError extends AppError {
  constructor(bookingId: string) {
    super(`Booking with ID '${bookingId}' not found`, 404, "BOOKING_NOT_FOUND");
  }
}

export class InsufficientStockError extends AppError {
  constructor(carId: string, requestedStock: number, availableStock: number) {
    super(
      `Insufficient stock for car '${carId}': requested ${requestedStock}, available ${availableStock}`,
      409,
      "INSUFFICIENT_STOCK"
    );
  }
}
