import { colors, typography, spacing, borderRadius, shadows } from "../tokens";

export const lightTheme = {
  colors: {
    background: {
      primary: colors.background.primary,
      secondary: colors.background.secondary,
      tertiary: colors.background.tertiary,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      tertiary: colors.text.tertiary,
      inverse: colors.text.inverse,
    },
    primary: colors.primary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    neutral: colors.neutral,
  },
  typography,
  spacing,
  borderRadius,
  shadows,
  components: {
    button: {
      borderRadius: borderRadius.base,
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.tight,
    },
    input: {
      borderRadius: borderRadius.base,
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: typography.fontSize.base,
      borderColor: colors.neutral[300],
      focusBorderColor: colors.primary[500],
    },
    card: {
      borderRadius: borderRadius.lg,
      padding: spacing[6],
      shadow: shadows.base,
      borderColor: colors.neutral[200],
    },
  },
} as const;

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: {
      primary: colors.neutral[900],
      secondary: colors.neutral[800],
      tertiary: colors.neutral[700],
    },
    text: {
      primary: colors.neutral[50],
      secondary: colors.neutral[200],
      tertiary: colors.neutral[400],
      inverse: colors.text.primary,
    },
  },
} as const;

export const theme = lightTheme;

export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeTypography = typeof theme.typography;
export type ThemeSpacing = typeof theme.spacing;
