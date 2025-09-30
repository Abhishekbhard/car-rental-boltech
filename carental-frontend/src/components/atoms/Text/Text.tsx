import React from "react";
import styles from "./Text.module.css";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "body-sm"
  | "body-lg"
  | "caption"
  | "label";

export type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "success"
  | "error"
  | "warning";

export interface TextProps extends React.HTMLAttributes<unknown> {
  variant?: TextVariant;
  color?: TextColor;
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right" | "justify";
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  htmlFor?: string;
}

const variantMap: Record<TextVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  "body-sm": "p",
  "body-lg": "p",
  caption: "span",
  label: "label",
};

export const Text: React.FC<TextProps> = ({
  variant = "body",
  color = "primary",
  weight = "normal",
  align = "left",
  className = "",
  children,
  as,
  ...props
}) => {
  const Component = as || variantMap[variant];

  const textClasses = [
    styles.text,
    styles[variant],
    styles[color],
    styles[weight],
    styles[align],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return React.createElement(
    Component,
    { className: textClasses, ...props },
    children
  );
};
