import { CheckAvailabilityUseCase } from "../../src/application/checkAvailability.service";
import { Car } from "../../src/domain/entities/car.entity";
import { BookingRepository } from "../../src/domain/repositories/booking.repository";
import { CarRepository } from "../../src/domain/repositories/car.repository";
import { PricingService } from "../../src/domain/services/pricing.service";

// Mocking the repositories and service
const mockCarRepository: jest.Mocked<CarRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  updateStock: jest.fn(),
};

const mockBookingRepository: jest.Mocked<BookingRepository> = {
  save: jest.fn(),
  findBookingsByCarForPeriod: jest.fn(),
  findBookingsByUserForPeriod: jest.fn(),
};

// Use the real pricing service as it's pure logic
const pricingService = new PricingService();

const testCars: Car[] = [
  {
    id: "c1",
    brand: "Toyota",
    model: "Yaris",
    stock: 2,
    prices: { peak: 100, mid: 75, off: 50 },
  },
  {
    id: "c2",
    brand: "Seat",
    model: "Ibiza",
    stock: 1,
    prices: { peak: 90, mid: 70, off: 45 },
  },
];

describe("CheckAvailabilityUseCase", () => {
  let checkAvailability: CheckAvailabilityUseCase;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    checkAvailability = new CheckAvailabilityUseCase(
      mockCarRepository,
      mockBookingRepository,
      pricingService
    );
  });

  it("should return all cars when no bookings exist", async () => {
    mockCarRepository.findAll.mockResolvedValue(testCars);
    mockBookingRepository.findBookingsByCarForPeriod.mockResolvedValue([]);

    const startDate = new Date("2024-07-10");
    const endDate = new Date("2024-07-11"); // 2 days in peak season

    const availableCars = await checkAvailability.execute(startDate, endDate);

    expect(availableCars).toHaveLength(2);
    expect(availableCars[0].priceDetails.totalPrice).toBe(200); // 2 * 100
    expect(availableCars[1].priceDetails.totalPrice).toBe(180); // 2 * 90
    expect(availableCars[0].stock).toBe(2); // stock remains 2
    expect(availableCars[1].stock).toBe(1); // stock remains 1
    expect(mockCarRepository.findAll).toHaveBeenCalledTimes(1);
    expect(
      mockBookingRepository.findBookingsByCarForPeriod
    ).toHaveBeenCalledTimes(2);
  });

  it("should not return a car if it is fully booked", async () => {
    mockCarRepository.findAll.mockResolvedValue(testCars);

    // c2 has stock of 1, but we don't care about bookings anymore
    // since availability is just stock > 0
    mockBookingRepository.findBookingsByCarForPeriod.mockResolvedValue([]);

    const startDate = new Date("2024-07-10");
    const endDate = new Date("2024-07-11");

    const availableCars = await checkAvailability.execute(startDate, endDate);

    expect(availableCars).toHaveLength(2); // Both cars have stock > 0
    expect(availableCars[0].id).toBe("c1");
    expect(availableCars[1].id).toBe("c2");
  });

  it("should return cars with remaining stock", async () => {
    mockCarRepository.findAll.mockResolvedValue(testCars);
    mockBookingRepository.findBookingsByCarForPeriod.mockResolvedValue([]);

    const startDate = new Date("2024-07-10");
    const endDate = new Date("2024-07-11");

    const availableCars = await checkAvailability.execute(startDate, endDate);

    expect(availableCars).toHaveLength(2); // Both cars have stock > 0
    const c1 = availableCars.find((c) => c.id === "c1");
    const c2 = availableCars.find((c) => c.id === "c2");
    expect(c1).toBeDefined();
    expect(c2).toBeDefined();
    expect(c1?.stock).toBe(2); // stock remains 2
    expect(c2?.stock).toBe(1); // stock remains 1
  });
});
