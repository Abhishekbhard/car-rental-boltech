import { v4 as uuidv4 } from "uuid";
import { BookingRepository } from "../domain/repositories/booking.repository";
import { CarRepository } from "../domain/repositories/car.repository";
import { Booking } from "../domain/entities/booking.entity";
import {
  NotFoundError,
  ConflictError,
  ValidationError,
  CarNotAvailableError,
  UserBookingConflictError,
} from "../infrastructure/api/utils/errors";

// We'll use a simplified User repository for the MVP
interface SimpleUserRepository {
  findByName(
    name: string
  ): Promise<{ id: string; drivingLicenseValidUntil: Date } | null>;
  create(name: string): Promise<{ id: string; drivingLicenseValidUntil: Date }>;
}

export class CreateBookingUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly carRepository: CarRepository,
    private readonly userRepository: SimpleUserRepository
  ) {}

  async execute(
    userName: string,
    carId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Booking> {
    // 1. Validate inputs
    if (startDate >= endDate) {
      throw new ValidationError("Start date must be before end date.");
    }

    const car = await this.carRepository.findById(carId);
    if (!car) {
      throw new NotFoundError("Car not found.");
    }

    // 2. Find or create user
    let user = await this.userRepository.findByName(userName);
    if (!user) {
      user = await this.userRepository.create(userName);
    }

    // 3. Check business rules
    // Rule: Driving license must be valid
    if (user.drivingLicenseValidUntil < endDate) {
      throw new ConflictError(
        "Driving license expires during the booking period."
      );
    }

    // Rule: User can't have overlapping bookings
    const userBookings =
      await this.bookingRepository.findBookingsByUserForPeriod(
        user.id,
        startDate,
        endDate
      );
    if (userBookings.length > 0) {
      throw new UserBookingConflictError(
        userName,
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0]
      );
    }

    // Rule: Car must have stock available
    if (car.stock <= 0) {
      throw new CarNotAvailableError(
        `${car.brand} ${car.model}`,
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0]
      );
    }

    // 4. Create and save the booking
    const newBooking: Booking = {
      id: uuidv4(),
      userId: user.id,
      carId,
      startDate,
      endDate,
    };

    await this.bookingRepository.save(newBooking);

    // 5. Decrease car stock by 1
    await this.carRepository.updateStock(carId, car.stock - 1);

    return newBooking;
  }
}
