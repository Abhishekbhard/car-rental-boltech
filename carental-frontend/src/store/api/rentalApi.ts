import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AvailableCar,
  Booking,
  CreateBookingPayload,
  ApiResponse,
} from "../../types";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AvailabilityResponse extends ApiResponse<AvailableCar[]> {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BookingResponse extends ApiResponse<Booking> {}

export const rentalApi = createApi({
  reducerPath: "rentalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/rentals",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["Availability"],
  endpoints: (builder) => ({
    getAvailability: builder.query<
      AvailableCar[],
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) => ({
        url: "availability",
        params: { startDate, endDate },
      }),
      providesTags: ["Availability"],
      transformResponse: (response: AvailabilityResponse) => {
        if (!response.success) {
          throw new Error(
            response.error?.message || "Failed to fetch availability"
          );
        }
        return response.data || [];
      },
    }),
    createBooking: builder.mutation<Booking, CreateBookingPayload>({
      query: (bookingData) => ({
        url: "bookings",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Availability"],
      transformResponse: (response: BookingResponse) => {
        if (!response.success) {
          throw new Error(
            response.error?.message || "Failed to create booking"
          );
        }
        return response.data!;
      },
    }),
  }),
});

export const { useGetAvailabilityQuery, useCreateBookingMutation } = rentalApi;
