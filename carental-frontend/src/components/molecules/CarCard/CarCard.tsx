import React from "react";
import { Button, Text } from "../../atoms";
import type { AvailableCar } from "../../../types";
import styles from "./CarCard.module.css";

export interface CarCardProps {
  car: AvailableCar;
  onOpenModal: (car: AvailableCar) => void;
  isBooking?: boolean;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  onOpenModal,
  isBooking = false,
}) => {
  const handleBook = () => {
    onOpenModal(car);
  };

  return (
    <div className={styles.carCard}>
      <div className={styles.carImage}>
        {/* Placeholder for car image */}
        <div className={styles.imagePlaceholder}>
          <Text variant="body-lg" color="inverse" weight="semibold">
            {car.brand} {car.model}
          </Text>
        </div>
      </div>

      <div className={styles.carInfo}>
        <div className={styles.carHeader}>
          <Text variant="h4" weight="semibold" className={styles.carTitle}>
            {car.brand} {car.model}
          </Text>
          <Text variant="caption" color="secondary">
            {car.stock} available
          </Text>
        </div>

        <div className={styles.priceInfo}>
          <div className={styles.price}>
            <Text variant="h3" weight="bold" color="primary">
              ${car.priceDetails.totalPrice}
            </Text>
            <Text variant="body-sm" color="secondary">
              total
            </Text>
          </div>
          <div className={styles.dailyPrice}>
            <Text variant="body" color="secondary">
              ${car.priceDetails.averageDailyPrice}/day
            </Text>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            variant="primary"
            size="md"
            onClick={handleBook}
            isLoading={isBooking}
            className={styles.bookButton}
          >
            {isBooking ? "Booking..." : "Book Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};
