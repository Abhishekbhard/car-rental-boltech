import React from "react";
import styles from "./Skeleton.module.css";

export type SkeletonVariant = "text" | "rectangular" | "circular";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: "pulse" | "wave" | false;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "text",
  width,
  height,
  className = "",
  animation = "pulse",
}) => {
  const skeletonClasses = [
    styles.skeleton,
    styles[variant],
    animation && styles[animation],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style: React.CSSProperties = {};

  if (width !== undefined) {
    style.width = typeof width === "number" ? `${width}px` : width;
  }

  if (height !== undefined) {
    style.height = typeof height === "number" ? `${height}px` : height;
  }

  return <div className={skeletonClasses} style={style} />;
};

export const SkeletonText: React.FC<Omit<SkeletonProps, "variant">> = (
  props
) => <Skeleton variant="text" {...props} />;

export const SkeletonRectangular: React.FC<Omit<SkeletonProps, "variant">> = (
  props
) => <Skeleton variant="rectangular" {...props} />;

export const SkeletonCircular: React.FC<Omit<SkeletonProps, "variant">> = (
  props
) => <Skeleton variant="circular" {...props} />;

export const CarCardSkeleton: React.FC = () => (
  <div className={styles.carCardSkeleton}>
    <SkeletonRectangular width="100%" height={200} />
    <div className={styles.carCardContent}>
      <SkeletonText width="80%" height={24} />
      <SkeletonText width="60%" height={20} />
      <SkeletonText width="40%" height={16} />
      <div className={styles.carCardActions}>
        <SkeletonRectangular width={100} height={36} />
      </div>
    </div>
  </div>
);

export const CarListSkeleton: React.FC<{ count?: number }> = ({
  count = 6,
}) => (
  <div className={styles.carListSkeleton}>
    {Array.from({ length: count }, (_, index) => (
      <CarCardSkeleton key={index} />
    ))}
  </div>
);
