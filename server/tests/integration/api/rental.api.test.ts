import request from "supertest";
import express from "express";
import rentalRouter from "../../../src/infrastructure/api/routes/rental.routes";
import { errorHandler } from "../../../src/infrastructure/api/middlewares/errorHandler";
import { MongoBookingRepository } from "../../../src/infrastructure/repositories/Booking.repository";
import { MongoCarRepository } from "../../../src/infrastructure/repositories/Car.repository";
import { MongoUserRepository } from "../../../src/infrastructure/repositories/User.repository";

jest.mock("../../../src/infrastructure/repositories/mongoCar.repository");
jest.mock("../../../src/infrastructure/repositories/mongoUser.repository");
jest.mock("../../../src/infrastructure/repositories/mongoBooking.repository");

const mockCarRepo = jest.mocked(MongoCarRepository.prototype);
const mockUserRepo = jest.mocked(MongoUserRepository.prototype);
const mockBookingRepo = jest.mocked(MongoBookingRepository.prototype);

const app = express();
app.use(express.json());
app.use("/api/rentals", rentalRouter);
app.use(errorHandler);

describe("Rental API Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockCarRepo.findAll.mockResolvedValue([
      {
        id: "c1",
        brand: "Toyota",
        model: "Camry",
        stock: 5,
        prices: { peak: 100, mid: 75, off: 50 },
      },
    ]);
    mockCarRepo.findById.mockImplementation(async (id: string) => {
      if (id === "c1") {
        return {
          id: "c1",
          brand: "Toyota",
          model: "Camry",
          stock: 5,
          prices: { peak: 100, mid: 75, off: 50 },
        };
      }
      if (id === "c2") {
        return {
          id: "c2",
          brand: "Honda",
          model: "Civic",
          stock: 3,
          prices: { peak: 90, mid: 70, off: 45 },
        };
      }
      return null;
    });

    mockUserRepo.findById.mockImplementation(async (id: string) => {
      if (id === "u1") {
        return {
          id: "u1",
          name: "John Doe",
          drivingLicenseValidUntil: new Date("2025-01-01"),
        };
      }
      return null;
    });
    mockUserRepo.findByName.mockImplementation(async (name: string) => {
      if (name === "John Doe") {
        return {
          id: "u1",
          drivingLicenseValidUntil: new Date("2025-01-01"),
        };
      }
      return null;
    });
    mockUserRepo.create.mockImplementation(async (name: string) => {
      return {
        id: "u1",
        drivingLicenseValidUntil: new Date("2025-01-01"),
      };
    });

    mockBookingRepo.findBookingsByCarForPeriod.mockResolvedValue([]);
    mockBookingRepo.findBookingsByUserForPeriod.mockResolvedValue([]);
    mockBookingRepo.save.mockResolvedValue();
  });
  describe("GET /api/rentals/availability", () => {
    it("should return available cars for valid dates", async () => {
      const response = await request(app)
        .get("/api/rentals/availability")
        .query({ startDate: "2024-07-10", endDate: "2024-07-11" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBe(true);
      response.body.data.forEach((car: any) => {
        expect(car).toHaveProperty("priceDetails");
        expect(car.priceDetails).toHaveProperty("totalPrice");
        expect(car.priceDetails).toHaveProperty("averageDailyPrice");
      });
    });

    it("should return 400 for missing startDate", async () => {
      const response = await request(app)
        .get("/api/rentals/availability")
        .query({ endDate: "2024-07-11" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body.error).toHaveProperty("code", "VALIDATION_ERROR");
    });

    it("should return 400 for invalid date format", async () => {
      const response = await request(app)
        .get("/api/rentals/availability")
        .query({ startDate: "invalid", endDate: "2024-07-11" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body.error).toHaveProperty("code", "VALIDATION_ERROR");
    });
  });

  describe("POST /api/rentals/bookings", () => {
    it("should create a booking successfully", async () => {
      mockUserRepo.findByName.mockResolvedValueOnce(null);
      mockUserRepo.create.mockResolvedValueOnce({
        id: "u1",
        drivingLicenseValidUntil: new Date("2025-01-01"),
      });

      const bookingData = {
        userName: "John Doe",
        carId: "c1",
        startDate: "2024-07-10T00:00:00.000Z",
        endDate: "2024-07-11T00:00:00.000Z",
      };

      const response = await request(app)
        .post("/api/rentals/bookings")
        .send(bookingData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("userId");
      expect(response.body.data).toHaveProperty("carId", "c1");
    });

    it("should return 400 for missing required fields", async () => {
      const response = await request(app)
        .post("/api/rentals/bookings")
        .send({ userName: "John Doe" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body.error).toHaveProperty("code", "VALIDATION_ERROR");
    });

    it("should return 404 for non-existent car", async () => {
      const bookingData = {
        userName: "John Doe",
        carId: "nonexistent",
        startDate: "2024-07-10T00:00:00.000Z",
        endDate: "2024-07-11T00:00:00.000Z",
      };

      const response = await request(app)
        .post("/api/rentals/bookings")
        .send(bookingData);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body.error).toHaveProperty("code", "NOT_FOUND");
    });

    it("should return 409 for conflicting booking", async () => {
      mockUserRepo.findByName.mockResolvedValueOnce(null);
      mockUserRepo.create.mockResolvedValueOnce({
        id: "u1",
        drivingLicenseValidUntil: new Date("2025-01-01"),
      });

      const bookingData = {
        userName: "John Doe",
        carId: "c1",
        startDate: "2024-07-10T00:00:00.000Z",
        endDate: "2024-07-11T00:00:00.000Z",
      };

      await request(app).post("/api/rentals/bookings").send(bookingData);

      mockUserRepo.findByName.mockResolvedValueOnce({
        id: "u1",
        drivingLicenseValidUntil: new Date("2025-01-01"),
      });

      mockCarRepo.findById.mockResolvedValueOnce({
        id: "c1",
        brand: "Toyota",
        model: "Camry",
        stock: 0,
        prices: { peak: 100, mid: 75, off: 50 },
      });

      const response = await request(app)
        .post("/api/rentals/bookings")
        .send(bookingData);

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body.error).toHaveProperty("code", "CAR_NOT_AVAILABLE");
      expect(response.body.error.message).toContain("Toyota Camry");
      expect(response.body.error.message).toContain("not available");
    });

    it("should return 409 for user booking conflict", async () => {
      mockUserRepo.findByName.mockResolvedValueOnce(null);
      mockUserRepo.create.mockResolvedValueOnce({
        id: "u1",
        drivingLicenseValidUntil: new Date("2025-01-01"),
      });

      const bookingData = {
        userName: "John Doe",
        carId: "c1",
        startDate: "2024-07-10T00:00:00.000Z",
        endDate: "2024-07-11T00:00:00.000Z",
      };

      await request(app).post("/api/rentals/bookings").send(bookingData);

      mockUserRepo.findByName.mockResolvedValueOnce({
        id: "u1",
        drivingLicenseValidUntil: new Date("2025-01-01"),
      });

      mockBookingRepo.findBookingsByUserForPeriod.mockResolvedValueOnce([
        {
          id: "existing-booking",
          carId: "c1",
          userId: "u1",
          startDate: new Date("2024-07-10T00:00:00.000Z"),
          endDate: new Date("2024-07-11T00:00:00.000Z"),
        },
      ]);

      const secondBookingData = {
        userName: "John Doe",
        carId: "c2",
        startDate: "2024-07-10T00:00:00.000Z",
        endDate: "2024-07-11T00:00:00.000Z",
      };

      const response = await request(app)
        .post("/api/rentals/bookings")
        .send(secondBookingData);

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body.error).toHaveProperty(
        "code",
        "USER_BOOKING_CONFLICT"
      );
      expect(response.body.error.message).toContain("John Doe");
      expect(response.body.error.message).toContain("already has a booking");
    });
  });
});
