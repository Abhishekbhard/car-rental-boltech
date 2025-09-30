export interface ApiError {
  code: string;
  message: string;
  details?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  stock: number;
  prices: {
    peak: number;
    mid: number;
    off: number;
  };
}

export interface PriceDetails {
  totalPrice: number;
  averageDailyPrice: number;
}

export interface AvailableCar extends Car {
  priceDetails: PriceDetails;
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
}

export interface CreateBookingPayload {
  userName: string;
  carId: string;
  startDate: string;
  endDate: string;
}
