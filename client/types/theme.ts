// types/theme.ts
export interface Theme {
    id: string;
    name: string;
    background: {
        dark: string;
        light: string;
    };
    foreground: {
        dark: string;
        light: string;
    };
    radius: string;
}

export type ThemeMode = 'light' | 'dark';
