import { UserModel } from "../models/user.model";

export class MongoUserRepository {
  async findById(
    id: string
  ): Promise<{ id: string; drivingLicenseValidUntil: Date } | null> {
    try {
      const doc = await UserModel.findOne({ _id: id });
      if (!doc) return null;
      return {
        id: doc._id,
        drivingLicenseValidUntil: doc.drivingLicenseValidUntil,
      };
    } catch (error) {
      console.error("Error finding user by id:", error);
      return null;
    }
  }

  async findByName(
    name: string
  ): Promise<{ id: string; drivingLicenseValidUntil: Date } | null> {
    try {
      const doc = await UserModel.findOne({ name });
      if (!doc) return null;
      return {
        id: doc._id,
        drivingLicenseValidUntil: doc.drivingLicenseValidUntil,
      };
    } catch (error) {
      console.error("Error finding user by name:", error);
      return null;
    }
  }

  async create(
    name: string
  ): Promise<{ id: string; drivingLicenseValidUntil: Date }> {
    try {
      const defaultLicenseExpiry = new Date();
      defaultLicenseExpiry.setFullYear(defaultLicenseExpiry.getFullYear() + 1);

      const newUser = await UserModel.create({
        _id: `u${Date.now()}`,
        name,
        drivingLicenseValidUntil: defaultLicenseExpiry,
      });

      return {
        id: newUser._id,
        drivingLicenseValidUntil: newUser.drivingLicenseValidUntil,
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}
