import mongoose from "mongoose";
import dotenv from "dotenv";
import { CarModel } from "./src/infrastructure/models/car.model";
import { UserModel } from "./src/infrastructure/models/user.model";
import { BookingModel } from "./src/infrastructure/models/booking.model";

// Load environment variables
dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/car-rental";

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Drop collections completely to remove old indexes
    try {
      await mongoose.connection.db.dropCollection("cars");
      console.log("Dropped cars collection");
    } catch (error) {
      console.log("Cars collection didn't exist or couldn't be dropped");
    }

    try {
      await mongoose.connection.db.dropCollection("users");
      console.log("Dropped users collection");
    } catch (error) {
      console.log("Users collection didn't exist or couldn't be dropped");
    }

    try {
      await mongoose.connection.db.dropCollection("bookings");
      console.log("Dropped bookings collection");
    } catch (error) {
      console.log("Bookings collection didn't exist or couldn't be dropped");
    }

    // Seed cars
    const cars = [
      {
        _id: "c1",
        brand: "Toyota",
        model: "Yaris",
        stock: 3,
        prices: { peak: 98.43, mid: 76.89, off: 53.65 },
      },
      {
        _id: "c2",
        brand: "Seat",
        model: "Ibiza",
        stock: 5,
        prices: { peak: 85.12, mid: 65.73, off: 46.85 },
      },
      {
        _id: "c3",
        brand: "Nissan",
        model: "Qashqai",
        stock: 2,
        prices: { peak: 101.46, mid: 82.94, off: 59.87 },
      },
      {
        _id: "c4",
        brand: "Jaguar",
        model: "e-pace",
        stock: 1,
        prices: { peak: 120.54, mid: 91.35, off: 70.27 },
      },
      {
        _id: "c5",
        brand: "Mercedes",
        model: "Vito",
        stock: 2,
        prices: { peak: 109.16, mid: 89.64, off: 64.97 },
      },
    ];

    await CarModel.insertMany(cars);
    console.log("Seeded cars");

    // Seed users
    const users = [
      {
        _id: "u1",
        name: "John Doe",
        drivingLicenseValidUntil: new Date("2025-12-31"),
      },
      {
        _id: "u2",
        name: "Jane Smith",
        drivingLicenseValidUntil: new Date("2024-05-15"),
      },
    ];

    await UserModel.insertMany(users);
    console.log("Seeded users");

    // Bookings are empty, so no seeding

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

seedData();
