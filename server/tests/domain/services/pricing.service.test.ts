import { Car } from "../../../src/domain/entities/car.entity";
import { PricingService } from "../../../src/domain/services/pricing.service";

describe("PricingService", () => {
  const pricingService = new PricingService();
  const testCar: Car = {
    id: "test-car",
    brand: "Test",
    model: "Car",
    stock: 1,
    prices: {
      peak: 100,
      mid: 75,
      off: 50,
    },
  };

  it("should calculate price correctly within off-season", () => {
    const startDate = new Date("2024-01-10");
    const endDate = new Date("2024-01-12");
    const priceDetails = pricingService.calculatePrice(
      testCar,
      startDate,
      endDate
    );
    expect(priceDetails.totalPrice).toBe(150);
    expect(priceDetails.averageDailyPrice).toBe(50);
  });

  it("should calculate price correctly within peak-season", () => {
    const startDate = new Date("2024-07-10");
    const endDate = new Date("2024-07-11");
    const priceDetails = pricingService.calculatePrice(
      testCar,
      startDate,
      endDate
    );
    expect(priceDetails.totalPrice).toBe(200);
    expect(priceDetails.averageDailyPrice).toBe(100);
  });

  it("should calculate price correctly crossing from mid to peak season", () => {
    const startDate = new Date("2024-05-31");
    const endDate = new Date("2024-06-01");
    const priceDetails = pricingService.calculatePrice(
      testCar,
      startDate,
      endDate
    );
    expect(priceDetails.totalPrice).toBe(175);
    expect(priceDetails.averageDailyPrice).toBe(87.5);
  });

  it("should calculate price correctly crossing from off to mid season", () => {
    const startDate = new Date("2024-02-28");
    const endDate = new Date("2024-03-02");
    const priceDetails = pricingService.calculatePrice(
      testCar,
      startDate,
      endDate
    );

    expect(priceDetails.totalPrice).toBe(50 + 50 + 75 + 75);
    expect(priceDetails.averageDailyPrice).toBe(
      parseFloat((250 / 4).toFixed(2))
    );
  });
});
