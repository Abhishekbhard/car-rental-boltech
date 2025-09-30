import React, { useState } from "react";
import { Button, Text, Select } from "../../atoms";
import { FormField } from "../../molecules";
import type { AvailableCar } from "../../../types";
import styles from "./BookingModal.module.css";

export interface BookingModalData {
  userName: string;
  startDate: string;
  endDate: string;
}

export interface BookingModalProps {
  car: AvailableCar;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (data: BookingModalData) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  car,
  isOpen,
  isLoading = false,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<BookingModalData>({
    userName: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState<Partial<BookingModalData>>({});

  const userOptions = [
    { value: "alex-johnson", label: "Alex Johnson" },
    { value: "sarah-chen", label: "Sarah Chen" },
    { value: "michael-rodriguez", label: "Michael Rodriguez" },
    { value: "emma-thompson", label: "Emma Thompson" },
    { value: "david-kim", label: "David Kim" },
  ];

  const handleInputChange =
    (field: keyof BookingModalData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));

      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingModalData> = {};

    if (!formData.userName) {
      newErrors.userName = "Please select a user";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (endDate <= startDate) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      userName: "",
      startDate: "",
      endDate: "",
    });
    setErrors({});
    onClose();
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <Text variant="h3" weight="semibold">
            Book {car.brand} {car.model}
          </Text>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            type="button"
          >
            ×
          </button>
        </div>

        <div className={styles.carInfo}>
          <div className={styles.carDetails}>
            <Text variant="h4" weight="semibold">
              {car.brand} {car.model}
            </Text>
            <Text variant="body" color="secondary">
              ${car.priceDetails.totalPrice} total • $
              {car.priceDetails.averageDailyPrice}/day
            </Text>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formField}>
            <Select
              label="Select User"
              placeholder="Choose a user"
              options={userOptions}
              value={formData.userName}
              onChange={handleInputChange("userName")}
              error={errors.userName}
              required
            />
          </div>

          <FormField
            label="Start Date"
            type="date"
            min={getTodayDate()}
            value={formData.startDate}
            onChange={handleInputChange("startDate")}
            error={errors.startDate}
            required
          />

          <FormField
            label="End Date"
            type="date"
            min={formData.startDate || getTodayDate()}
            value={formData.endDate}
            onChange={handleInputChange("endDate")}
            error={errors.endDate}
            required
          />

          <div className={styles.actions}>
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isLoading}>
              {isLoading ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
