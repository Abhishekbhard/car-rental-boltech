import { Car } from "../entities/car.entity";

export interface CarRepository {
  findById(id: string): Promise<Car | null>;
  findAll(): Promise<Car[]>;
  updateStock(id: string, newStock: number): Promise<void>;
}
