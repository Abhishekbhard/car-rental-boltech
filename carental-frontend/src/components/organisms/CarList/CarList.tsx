import React from 'react';
import { Text, CarListSkeleton } from '../../atoms';
import { CarCard } from '../../molecules';
import type { AvailableCar } from '../../../types';
import styles from './CarList.module.css';

export interface CarListProps {
  cars: AvailableCar[];
  onOpenModal: (car: AvailableCar) => void;
  isBooking?: boolean;
  bookingCarId?: string;
  isLoading?: boolean;
  error?: string;
}

export const CarList: React.FC<CarListProps> = ({
  cars,
  onOpenModal,
  isBooking = false,
  bookingCarId,
  isLoading = false,
  error
}) => {
  if (isLoading) {
    return (
      <div className={styles.carList}>
        <div className={styles.header}>
          <Text variant="h3" weight="semibold">
            Available Cars
          </Text>
          <Text variant="body" color="secondary">
            Searching for the perfect car...
          </Text>
        </div>
        <CarListSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.carList}>
        <div className={styles.error}>
          <Text variant="body-lg" color="error">
            {error}
          </Text>
        </div>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className={styles.carList}>
        <div className={styles.empty}>
          <Text variant="h4" weight="semibold" color="secondary">
            No cars available
          </Text>
          <Text variant="body" color="secondary">
            Try adjusting your search dates or location
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.carList}>
      <div className={styles.header}>
        <Text variant="h3" weight="semibold">
          Available Cars ({cars.length})
        </Text>
        <Text variant="body" color="secondary">
          Choose the perfect car for your journey
        </Text>
      </div>

      <div className={styles.grid}>
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onOpenModal={onOpenModal}
            isBooking={isBooking && bookingCarId === car.id}
          />
        ))}
      </div>
    </div>
  );
};