import mongoose, { Document } from "mongoose";

export interface IBooking {
  _id: string;
  carId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
}

const bookingSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  carId: { type: String, required: true },
  userId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const BookingModel = mongoose.model<IBooking & Document>(
  "Booking",
  bookingSchema
);
