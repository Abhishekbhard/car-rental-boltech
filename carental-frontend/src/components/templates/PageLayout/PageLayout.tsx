import React from "react";
import { Text } from "../../atoms";
import styles from "./PageLayout.module.css";

export interface PageLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  centered?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  children,
  className = "",
  maxWidth = "xl",
  centered = false,
}) => {
  const layoutClasses = [
    styles.pageLayout,
    styles[maxWidth],
    centered && styles.centered,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={layoutClasses}>
      {(title || subtitle) && (
        <header className={styles.header}>
          {title && (
            <Text variant="h1" weight="bold" className={styles.title}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              variant="body-lg"
              color="secondary"
              className={styles.subtitle}
            >
              {subtitle}
            </Text>
          )}
        </header>
      )}

      <main className={styles.content}>{children}</main>
    </div>
  );
};
