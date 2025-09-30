import { createContext } from "react";
import { theme } from "./themes";
import type { Theme } from "./themes";

export const ThemeContext = createContext<Theme>(theme);
