'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// context/ThemeContext.tsx
// "use client";
// import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { Theme, ThemeMode } from "@/types/theme";

// interface ThemeContextType {
//     theme: Theme | null;
//     mode: ThemeMode;
//     toggleMode: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [theme, setTheme] = useState<Theme | null>(null);
//     const [mode, setMode] = useState<ThemeMode>("light");

//     useEffect(() => {
//         const fetchTheme = async () => {
//             const response = await fetch("/api/themes");
//             const themeData: Theme[] = await response.json();
//             setTheme(themeData.length ? themeData[0] : null);
//         };
//         fetchTheme();
//     }, []);

//     useEffect(() => {
//         if (theme) {
//             const root = document.documentElement;

//             // Set CSS variables dynamically for light mode
//             root.style.setProperty("--background", mode === "light" ? theme.background.light : theme.background.dark);
//             root.style.setProperty("--foreground", mode === "light" ? theme.foreground.light : theme.foreground.dark);
//             root.style.setProperty("--card", mode === "light" ? theme.background.light : theme.background.dark);
//             root.style.setProperty("--card-foreground", mode === "light" ? theme.foreground.light : theme.foreground.dark);
//             root.style.setProperty("--radius", theme.radius);
//             // Add more theme variables as needed...
//         }
//     }, [theme, mode]);

//     const toggleMode = () => {
//         setMode((prev) => (prev === "light" ? "dark" : "light"));
//     };
//     console.log(theme);
//     console.log(mode);
//     return (
//         <ThemeContext.Provider value={{ theme, mode, toggleMode }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export const useTheme = (): ThemeContextType => {
//     const context = useContext(ThemeContext);
//     if (!context) {
//         throw new Error("useTheme must be used within a ThemeProvider");
//     }
//     return context;
// };
