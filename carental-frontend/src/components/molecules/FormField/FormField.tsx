import React from 'react';
import { Input, Text } from '../../atoms';
import type { InputProps } from '../../atoms';
import styles from './FormField.module.css';

export interface FormFieldProps extends Omit<InputProps, 'label'> {
  label?: string;
  required?: boolean;
  description?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  description,
  error,
  helperText,
  id,
  ...inputProps
}) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={styles.formField}>
      {label && (
        <div className={styles.labelContainer}>
          <Text
            as="label"
            variant="label"
            className={styles.label}
            htmlFor={fieldId}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </Text>
        </div>
      )}

      <Input
        id={fieldId}
        error={error}
        helperText={helperText}
        {...inputProps}
      />

      {description && !error && !helperText && (
        <Text variant="caption" color="secondary" className={styles.description}>
          {description}
        </Text>
      )}
    </div>
  );
};