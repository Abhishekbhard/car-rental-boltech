import { eachDayOfInterval, isWithinInterval } from "date-fns";
import { Car } from "../entities/car.entity";

export type Season = "peak" | "mid" | "off";

export interface PriceDetails {
  totalPrice: number;
  averageDailyPrice: number;
}

const seasons = {
  peak: [{ start: { month: 6, day: 1 }, end: { month: 9, day: 15 } }],
  mid: [
    { start: { month: 3, day: 1 }, end: { month: 5, day: 31 } },
    { start: { month: 9, day: 16 }, end: { month: 10, day: 31 } },
  ],
};

export class PricingService {
  private getSeason(date: Date): Season {
    const year = date.getFullYear();
    const jsDate = new Date(date);

    for (const interval of seasons.peak) {
      const startDate = new Date(
        year,
        interval.start.month - 1,
        interval.start.day
      );
      const endDate = new Date(year, interval.end.month - 1, interval.end.day);
      if (isWithinInterval(jsDate, { start: startDate, end: endDate })) {
        return "peak";
      }
    }

    for (const interval of seasons.mid) {
      const startDate = new Date(
        year,
        interval.start.month - 1,
        interval.start.day
      );
      const endDate = new Date(year, interval.end.month - 1, interval.end.day);
      if (isWithinInterval(jsDate, { start: startDate, end: endDate })) {
        return "mid";
      }
    }

    return "off";
  }

  public calculatePrice(
    car: Car,
    startDate: Date,
    endDate: Date
  ): PriceDetails {
    const rentalDays = eachDayOfInterval({ start: startDate, end: endDate });

    if (rentalDays.length === 0) {
      return { totalPrice: 0, averageDailyPrice: 0 };
    }

    let totalPrice = 0;
    for (const day of rentalDays) {
      const season = this.getSeason(day);
      totalPrice += car.prices[season];
    }

    const averageDailyPrice = totalPrice / rentalDays.length;

    return {
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      averageDailyPrice: parseFloat(averageDailyPrice.toFixed(2)),
    };
  }
}
