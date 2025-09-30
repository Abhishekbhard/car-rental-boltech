import React, { useState } from "react";
import { PageLayout } from "../../templates";
import { AvailabilityForm, CarList, BookingModal } from "../../organisms";
import {
  useGetAvailabilityQuery,
  useCreateBookingMutation,
} from "../../../store/api/rentalApi";
import { useToast } from "../../common";
import type { AvailabilityFormData, BookingModalData } from "../../organisms";
import type { AvailableCar } from "../../../types";
import styles from "./HomePage.module.css";

export const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useState<{
    startDate: string;
    endDate: string;
  } | null>(null);

  const [selectedCar, setSelectedCar] = useState<AvailableCar | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();
  const { showSuccess, showError } = useToast();

  const {
    data: availableCars = [],
    isLoading: isLoadingCars,
    error: carsError,
  } = useGetAvailabilityQuery(
    searchParams
      ? {
          startDate: searchParams.startDate,
          endDate: searchParams.endDate,
        }
      : { startDate: "", endDate: "" },
    {
      skip: !searchParams,
    }
  );

  const handleSearch = (data: AvailabilityFormData) => {
    const startDate = new Date(data.startDate).toISOString();
    const endDate = new Date(data.endDate).toISOString();

    setSearchParams({ startDate, endDate });
  };

  const handleOpenModal = (car: AvailableCar) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
  };

  const handleBookCar = async (data: BookingModalData) => {
    if (!selectedCar) return;

    try {
      await createBooking({
        userName: data.userName,
        carId: selectedCar.id,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      }).unwrap();

      showSuccess("Booking created successfully!");
      handleCloseModal();
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";

      if (error && typeof error === "object" && "status" in error) {
        const apiError = error as {
          status: number;
          data?: { error?: { code: string; message: string } };
        };

        switch (apiError.data?.error?.code) {
          case "CAR_NOT_AVAILABLE":
            errorMessage = `Sorry, ${selectedCar.brand} ${selectedCar.model} is not available for the selected dates. Please choose different dates or select another car.`;
            break;
          case "USER_BOOKING_CONFLICT":
            errorMessage =
              "You already have a booking during this period. A person can only book one car at a time.";
            break;
          case "VALIDATION_ERROR":
            errorMessage = apiError.data.error.message;
            break;
          case "NOT_FOUND":
            errorMessage = "The selected car is no longer available.";
            break;
          default:
            errorMessage =
              apiError.data?.error?.message ||
              "Booking failed due to an unexpected error";
        }
      }

      showError(`Booking failed: ${errorMessage}`);
    }
  };

  return (
    <PageLayout
      title="Welcome to Car Rental Boltech"
      subtitle="Find and book the perfect car for your journey with our extensive fleet of vehicles"
      maxWidth="full"
      className={styles.homePage}
    >
      <div className={styles.hero}>
        <AvailabilityForm onSubmit={handleSearch} />
      </div>

      {searchParams && (
        <div className={styles.results}>
          <CarList
            cars={availableCars}
            onOpenModal={handleOpenModal}
            isBooking={isBooking}
            bookingCarId={selectedCar?.id}
            isLoading={isLoadingCars}
            error={
              carsError
                ? (carsError as Error)?.message || "Failed to load cars"
                : undefined
            }
          />
        </div>
      )}

      {selectedCar && (
        <BookingModal
          car={selectedCar}
          isOpen={isModalOpen}
          isLoading={isBooking}
          onClose={handleCloseModal}
          onSubmit={handleBookCar}
        />
      )}
    </PageLayout>
  );
};
