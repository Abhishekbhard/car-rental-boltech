import {
  AppError,
  ValidationError,
  NotFoundError,
  ConflictError,
  CarNotFoundError,
  UserNotFoundError,
  CarNotAvailableError,
  UserBookingConflictError,
  InvalidDateRangeError,
  BookingNotFoundError,
  InsufficientStockError,
} from "../../../../src/infrastructure/api/utils/errors";

describe("Error Classes", () => {
  describe("AppError", () => {
    it("should create an AppError with default values", () => {
      const error = new AppError("Test error");

      expect(error.message).toBe("Test error");
      expect(error.statusCode).toBe(500);
      expect(error.errorCode).toBe("INTERNAL_ERROR");
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe("AppError");
    });

    it("should create an AppError with custom values", () => {
      const error = new AppError("Custom error", 400, "CUSTOM_ERROR", false);

      expect(error.message).toBe("Custom error");
      expect(error.statusCode).toBe(400);
      expect(error.errorCode).toBe("CUSTOM_ERROR");
      expect(error.isOperational).toBe(false);
    });
  });

  describe("ValidationError", () => {
    it("should create a ValidationError with correct properties", () => {
      const error = new ValidationError("Invalid input");

      expect(error.message).toBe("Invalid input");
      expect(error.statusCode).toBe(400);
      expect(error.errorCode).toBe("VALIDATION_ERROR");
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe("ValidationError");
    });
  });

  describe("NotFoundError", () => {
    it("should create a NotFoundError with correct properties", () => {
      const error = new NotFoundError("Resource not found");

      expect(error.message).toBe("Resource not found");
      expect(error.statusCode).toBe(404);
      expect(error.errorCode).toBe("NOT_FOUND");
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe("NotFoundError");
    });
  });

  describe("ConflictError", () => {
    it("should create a ConflictError with correct properties", () => {
      const error = new ConflictError("Resource conflict");

      expect(error.message).toBe("Resource conflict");
      expect(error.statusCode).toBe(409);
      expect(error.errorCode).toBe("CONFLICT");
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe("ConflictError");
    });
  });

  describe("CarNotFoundError", () => {
    it("should create a CarNotFoundError with correct properties", () => {
      const error = new CarNotFoundError("car123");

      expect(error.message).toBe("Car with ID 'car123' not found");
      expect(error.statusCode).toBe(404);
      expect(error.errorCode).toBe("CAR_NOT_FOUND");
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe("CarNotFoundError");
    });
  });

  describe("UserNotFoundError", () => {
    it("should create a UserNotFoundError with correct properties", () => {
      const error = new UserNotFoundError("user123");

      expect(error.message).toBe("User with ID 'user123' not found");
      expect(error.statusCode).toBe(404);
      expect(error.errorCode).toBe("USER_NOT_FOUND");
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe("UserNotFoundError");
    });
  });

  describe("CarNotAvailableError", () => {
    it("should create a CarNotAvailableError with correct properties", () => {
      const error = new CarNotAvailableError(
        "car123",
        "2024-01-01",
        "2024-01-05"
      );

      expect(error.message).toBe(
        "Car 'car123' is not available for the period 2024-01-01 to 2024-01-05"
      );
      expect(error.statusCode).toBe(409);
      expect(error.errorCode).toBe("CAR_NOT_AVAILABLE");
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe("CarNotAvailableError");
    });
  });

  describe("UserBookingConflictError", () => {
    it("should create a UserBookingConflictError with correct properties", () => {
      const error = new UserBookingConflictError(
        "user123",
        "2024-01-01",
        "2024-01-05"
      );

      expect(error.message).toBe(
        "User 'user123' already has a booking during the period 2024-01-01 to 2024-01-05"
      );
      expect(error.statusCode).toBe(409);
      expect(error.errorCode).toBe("USER_BOOKING_CONFLICT");
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe("UserBookingConflictError");
    });
  });

  describe("InvalidDateRangeError", () => {
    it("should create an InvalidDateRangeError with default message", () => {
      const error = new InvalidDateRangeError();

      expect(error.message).toBe(
        "Invalid date range: end date must be after start date"
      );
      expect(error.statusCode).toBe(400);
      expect(error.errorCode).toBe("INVALID_DATE_RANGE");
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe("InvalidDateRangeError");
    });

    it("should create an InvalidDateRangeError with custom message", () => {
      const error = new InvalidDateRangeError("Custom date error");

      expect(error.message).toBe("Custom date error");
      expect(error.statusCode).toBe(400);
      expect(error.errorCode).toBe("INVALID_DATE_RANGE");
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe("InvalidDateRangeError");
    });
  });

  describe("BookingNotFoundError", () => {
    it("should create a BookingNotFoundError with correct properties", () => {
      const error = new BookingNotFoundError("booking123");

      expect(error.message).toBe("Booking with ID 'booking123' not found");
      expect(error.statusCode).toBe(404);
      expect(error.errorCode).toBe("BOOKING_NOT_FOUND");
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe("BookingNotFoundError");
    });
  });

  describe("InsufficientStockError", () => {
    it("should create an InsufficientStockError with correct properties", () => {
      const error = new InsufficientStockError("car123", 3, 1);

      expect(error.message).toBe(
        "Insufficient stock for car 'car123': requested 3, available 1"
      );
      expect(error.statusCode).toBe(409);
      expect(error.errorCode).toBe("INSUFFICIENT_STOCK");
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe("InsufficientStockError");
    });
  });

  describe("Error inheritance", () => {
    it("should maintain instanceof relationships", () => {
      const carError = new CarNotFoundError("car123");
      const userError = new UserNotFoundError("user123");
      const validationError = new ValidationError("Invalid");

      expect(carError instanceof AppError).toBe(true);
      expect(carError instanceof Error).toBe(true);
      expect(userError instanceof AppError).toBe(true);
      expect(validationError instanceof AppError).toBe(true);
    });

    it("should have correct prototype chain", () => {
      const carError = new CarNotFoundError("car123");

      expect(Object.getPrototypeOf(carError.constructor).name).toBe("AppError");
      expect(
        Object.getPrototypeOf(Object.getPrototypeOf(carError.constructor)).name
      ).toBe("Error");
    });
  });
});
