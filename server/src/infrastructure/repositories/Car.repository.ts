import { Car } from "../../domain/entities/car.entity";
import { CarRepository } from "../../domain/repositories/car.repository";
import { CarModel } from "../models/car.model";

export class MongoCarRepository implements CarRepository {
  async findById(id: string): Promise<Car | null> {
    try {
      const doc = await CarModel.findOne({ _id: id });
      if (!doc) return null;
      return {
        id: doc._id,
        brand: doc.brand,
        model: doc.model,
        stock: doc.stock,
        prices: doc.prices,
      };
    } catch (error) {
      console.error("Error finding car by id:", error);
      return null;
    }
  }

  async findAll(): Promise<Car[]> {
    try {
      const docs = await CarModel.find();
      return docs.map((doc: any) => ({
        id: doc._id,
        brand: doc.brand,
        model: doc.model,
        stock: doc.stock,
        prices: doc.prices,
      }));
    } catch (error) {
      console.error("Error finding all cars:", error);
      return [];
    }
  }

  async updateStock(id: string, newStock: number): Promise<void> {
    try {
      await CarModel.updateOne({ _id: id }, { $set: { stock: newStock } });
    } catch (error) {
      console.error("Error updating car stock:", error);
      throw new Error("Failed to update car stock");
    }
  }
}
