export const getCssVar = (variable: string): string => {
  return `var(${variable})`;
};

export const cssVars = {
  color: {
    background: {
      primary: getCssVar("--color-background-primary"),
      secondary: getCssVar("--color-background-secondary"),
      tertiary: getCssVar("--color-background-tertiary"),
    },
    text: {
      primary: getCssVar("--color-text-primary"),
      secondary: getCssVar("--color-text-secondary"),
      tertiary: getCssVar("--color-text-tertiary"),
      inverse: getCssVar("--color-text-inverse"),
    },
    primary: (shade: number) => getCssVar(`--color-primary-${shade}`),
    success: (shade: number) => getCssVar(`--color-success-${shade}`),
    warning: (shade: number) => getCssVar(`--color-warning-${shade}`),
    error: (shade: number) => getCssVar(`--color-error-${shade}`),
    neutral: (shade: number) => getCssVar(`--color-neutral-${shade}`),
  },
  font: {
    family: {
      primary: getCssVar("--font-primary"),
      mono: getCssVar("--font-mono"),
    },
    size: {
      xs: getCssVar("--font-size-xs"),
      sm: getCssVar("--font-size-sm"),
      base: getCssVar("--font-size-base"),
      lg: getCssVar("--font-size-lg"),
      xl: getCssVar("--font-size-xl"),
      "2xl": getCssVar("--font-size-2xl"),
      "3xl": getCssVar("--font-size-3xl"),
      "4xl": getCssVar("--font-size-4xl"),
      "5xl": getCssVar("--font-size-5xl"),
    },
    weight: {
      normal: getCssVar("--font-weight-normal"),
      medium: getCssVar("--font-weight-medium"),
      semibold: getCssVar("--font-weight-semibold"),
      bold: getCssVar("--font-weight-bold"),
    },
    lineHeight: {
      tight: getCssVar("--line-height-tight"),
      normal: getCssVar("--line-height-normal"),
      relaxed: getCssVar("--line-height-relaxed"),
    },
  },
  spacing: (size: number) => getCssVar(`--spacing-${size}`),
  borderRadius: {
    none: getCssVar("--border-radius-none"),
    sm: getCssVar("--border-radius-sm"),
    base: getCssVar("--border-radius-base"),
    md: getCssVar("--border-radius-md"),
    lg: getCssVar("--border-radius-lg"),
    xl: getCssVar("--border-radius-xl"),
    "2xl": getCssVar("--border-radius-2xl"),
    "3xl": getCssVar("--border-radius-3xl"),
    full: getCssVar("--border-radius-full"),
  },
  shadow: {
    sm: getCssVar("--shadow-sm"),
    base: getCssVar("--shadow-base"),
    md: getCssVar("--shadow-md"),
    lg: getCssVar("--shadow-lg"),
    xl: getCssVar("--shadow-xl"),
    "2xl": getCssVar("--shadow-2xl"),
  },
} as const;
