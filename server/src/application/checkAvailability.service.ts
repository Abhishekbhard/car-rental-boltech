import { Car } from "../domain/entities/car.entity";
import { BookingRepository } from "../domain/repositories/booking.repository";
import { CarRepository } from "../domain/repositories/car.repository";
import {
  PriceDetails,
  PricingService,
} from "../domain/services/pricing.service";

interface AvailableCar extends Car {
  priceDetails: PriceDetails;
}

export class CheckAvailabilityUseCase {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly bookingRepository: BookingRepository,
    private readonly pricingService: PricingService
  ) {}

  async execute(startDate: Date, endDate: Date): Promise<AvailableCar[]> {
    const allCars = await this.carRepository.findAll();
    const availableCars: AvailableCar[] = [];

    for (const car of allCars) {
      const bookings = await this.bookingRepository.findBookingsByCarForPeriod(
        car.id,
        startDate,
        endDate
      );

      if (car.stock > 0) {
        const priceDetails = this.pricingService.calculatePrice(
          car,
          startDate,
          endDate
        );
        availableCars.push({ ...car, priceDetails });
      }
    }

    return availableCars;
  }
}
