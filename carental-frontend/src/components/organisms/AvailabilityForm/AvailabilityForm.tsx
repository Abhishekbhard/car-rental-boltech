import React, { useState } from "react";
import { Button, Text } from "../../atoms";
import { FormField } from "../../molecules";
import styles from "./AvailabilityForm.module.css";

export interface AvailabilityFormData {
  startDate: string;
  endDate: string;
}

export interface AvailabilityFormProps {
  onSubmit: (data: AvailabilityFormData) => void;
  isLoading?: boolean;
}

export const AvailabilityForm: React.FC<AvailabilityFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<AvailabilityFormData>({
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState<Partial<AvailabilityFormData>>({});

  const handleInputChange =
    (field: keyof AvailabilityFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const newErrors: Partial<AvailabilityFormData> = {};

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

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <div className={styles.availabilityForm}>
      <div className={styles.header}>
        <Text variant="h3" weight="semibold">
          Find Your Perfect Car
        </Text>
        <Text variant="body" color="secondary">
          Search for available cars by selecting your rental dates
        </Text>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
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
        </div>

        <div className={styles.actions}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? "Searching..." : "Search Cars"}
          </Button>
        </div>
      </form>
    </div>
  );
};
