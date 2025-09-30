import { Router } from "express";

import { RentalController } from "../controllers/rental.controller";
import { MongoCarRepository } from "../../repositories/Car.repository";
import { MongoBookingRepository } from "../../repositories/Booking.repository";
import { MongoUserRepository } from "../../repositories/User.repository";
import { PricingService } from "../../../domain/services/pricing.service";
import { CheckAvailabilityUseCase } from "../../../application/checkAvailability.service";
import { CreateBookingUseCase } from "../../../application/createBooking";

const rentalRouter = Router();

const carRepository = new MongoCarRepository();
const bookingRepository = new MongoBookingRepository();
const userRepository = new MongoUserRepository();
const pricingService = new PricingService();

const checkAvailabilityUseCase = new CheckAvailabilityUseCase(
  carRepository,
  bookingRepository,
  pricingService
);
const createBookingUseCase = new CreateBookingUseCase(
  bookingRepository,
  carRepository,
  userRepository
);

const rentalController = new RentalController(
  checkAvailabilityUseCase,
  createBookingUseCase
);

rentalRouter.get("/availability", (req, res) => {
  res.set("Cache-Control", "no-cache, no-store, must-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  return rentalController.getAvailability(req, res);
});
rentalRouter.post("/bookings", (req, res) =>
  rentalController.createBooking(req, res)
);

export default rentalRouter;
