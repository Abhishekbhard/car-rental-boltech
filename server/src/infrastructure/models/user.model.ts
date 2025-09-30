import mongoose, { Document } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  drivingLicenseValidUntil: Date;
}

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  drivingLicenseValidUntil: { type: Date, required: true },
});

export const UserModel = mongoose.model<IUser & Document>("User", userSchema);
