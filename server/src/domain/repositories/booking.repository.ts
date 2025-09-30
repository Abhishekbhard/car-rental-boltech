import { Booking } from "../entities/booking.entity";

export interface BookingRepository {
  save(booking: Booking): Promise<void>;
  findBookingsByCarForPeriod(
    carId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Booking[]>;
  findBookingsByUserForPeriod(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Booking[]>;
}
