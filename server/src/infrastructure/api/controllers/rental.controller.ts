import { Request, Response } from "express";
import { CheckAvailabilityUseCase } from "../../../application/checkAvailability.service";
import { CreateBookingUseCase } from "../../../application/createBooking";
import { ResponseUtil } from "../utils/response";
import { ValidationError } from "../utils/errors";

export class RentalController {
  constructor(
    private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
    private readonly createBookingUseCase: CreateBookingUseCase
  ) {}

  async getAvailability(req: Request, res: Response): Promise<void> {
    const { startDate, endDate } = req.query;

    if (
      !startDate ||
      !endDate ||
      typeof startDate !== "string" ||
      typeof endDate !== "string"
    ) {
      throw new ValidationError(
        "startDate and endDate query parameters are required and must be strings."
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new ValidationError("Invalid date format.");
    }

    const availableCars = await this.checkAvailabilityUseCase.execute(
      start,
      end
    );
    ResponseUtil.sendSuccess(
      res,
      availableCars,
      "Available cars retrieved successfully."
    );
  }

  async createBooking(req: Request, res: Response): Promise<void> {
    const { userName, carId, startDate, endDate } = req.body;

    if (!userName || !carId || !startDate || !endDate) {
      throw new ValidationError(
        "userName, carId, startDate, and endDate are required."
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const newBooking = await this.createBookingUseCase.execute(
      userName,
      carId,
      start,
      end
    );
    ResponseUtil.sendSuccess(
      res,
      newBooking,
      "Booking created successfully.",
      201
    );
  }
}
