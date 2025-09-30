import mongoose, { Document } from "mongoose";

export interface ICar {
  _id: string;
  brand: string;
  model: string;
  stock: number;
  prices: {
    peak: number;
    mid: number;
    off: number;
  };
}

const carSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  stock: { type: Number, required: true },
  prices: {
    peak: { type: Number, required: true },
    mid: { type: Number, required: true },
    off: { type: Number, required: true },
  },
});

export const CarModel = mongoose.model<ICar & Document>("Car", carSchema);
