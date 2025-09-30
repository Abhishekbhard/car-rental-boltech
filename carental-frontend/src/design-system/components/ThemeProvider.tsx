import React, { useMemo } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "../context";
import { theme } from "../themes";
import type { Theme } from "../themes";

interface ThemeProviderProps {
  children: ReactNode;
  customTheme?: Partial<Theme>;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  customTheme,
}) => {
  const mergedTheme = useMemo(
    () => ({ ...theme, ...customTheme }),
    [customTheme]
  );

  React.useEffect(() => {
    const root = document.documentElement;

    Object.entries(mergedTheme.colors).forEach(([category, values]) => {
      if (typeof values === "object" && values !== null) {
        Object.entries(values).forEach(([key, value]) => {
          if (typeof value === "string") {
            root.style.setProperty(`--color-${category}-${key}`, value);
          } else if (typeof value === "object" && value !== null) {
            Object.entries(value).forEach(([shade, shadeValue]) => {
              if (typeof shadeValue === "string") {
                root.style.setProperty(
                  `--color-${category}-${key}-${shade}`,
                  shadeValue
                );
              }
            });
          }
        });
      }
    });

    Object.entries(mergedTheme.typography.fontFamily).forEach(
      ([key, value]) => {
        root.style.setProperty(`--font-${key}`, value);
      }
    );

    Object.entries(mergedTheme.typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });

    Object.entries(mergedTheme.typography.fontWeight).forEach(
      ([key, value]) => {
        root.style.setProperty(`--font-weight-${key}`, value.toString());
      }
    );

    Object.entries(mergedTheme.typography.lineHeight).forEach(
      ([key, value]) => {
        root.style.setProperty(`--line-height-${key}`, value.toString());
      }
    );

    Object.entries(mergedTheme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    Object.entries(mergedTheme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--border-radius-${key}`, value);
    });

    Object.entries(mergedTheme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    Object.entries(mergedTheme.components).forEach(([component, values]) => {
      Object.entries(values).forEach(([prop, value]) => {
        root.style.setProperty(`--${component}-${prop}`, value);
      });
    });
  }, [mergedTheme]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
