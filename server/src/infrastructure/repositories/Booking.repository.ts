import { Booking } from "../../domain/entities/booking.entity";
import { BookingRepository } from "../../domain/repositories/booking.repository";
import { BookingModel } from "../models/booking.model";

export class MongoBookingRepository implements BookingRepository {
  async save(booking: Booking): Promise<void> {
    try {
      await BookingModel.create({
        _id: booking.id,
        carId: booking.carId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
      });
    } catch (error) {
      console.error("Error saving booking:", error);
      throw error;
    }
  }

  async findBookingsByCarForPeriod(
    carId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Booking[]> {
    try {
      const docs = await BookingModel.find({
        carId,
        $or: [{ startDate: { $lt: endDate }, endDate: { $gt: startDate } }],
      });
      return docs.map((doc) => ({
        id: doc._id,
        carId: doc.carId,
        userId: doc.userId,
        startDate: doc.startDate,
        endDate: doc.endDate,
      }));
    } catch (error) {
      console.error("Error finding bookings by car for period:", error);
      return [];
    }
  }

  async findBookingsByUserForPeriod(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Booking[]> {
    try {
      const docs = await BookingModel.find({
        userId,
        $or: [{ startDate: { $lt: endDate }, endDate: { $gt: startDate } }],
      });
      return docs.map((doc) => ({
        id: doc._id,
        carId: doc.carId,
        userId: doc.userId,
        startDate: doc.startDate,
        endDate: doc.endDate,
      }));
    } catch (error) {
      console.error("Error finding bookings by user for period:", error);
      return [];
    }
  }
}
