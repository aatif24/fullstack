'use client';

import * as React from 'react';
import { Computer, MoonIcon, MoonStar, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

export function ThemeToggle() {
    const { setTheme } = useTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full focus-visible:ring-0"
                >
                    <SunIcon className="absolute left-1/2 -translate-x-1/2 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
                    <MoonIcon className="absolute left-1/2 -translate-x-1/2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-1">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <SunIcon className="w-3 h-3 mr-2" /> Light
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <MoonStar className="w-3 h-3 mr-2" /> Dark
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Computer className="w-3 h-3 mr-2" /> System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


// app/theme-toggler.tsx
// "use client";

// import { useTheme } from "@/components/providers/theme.provider";
// import React from "react";

// export const ThemeToggle: React.FC = () => {
//     const { theme, mode, toggleMode } = useTheme();

//     if (!theme) return null;

//     return (
//         <button
//             onClick={toggleMode}
//             style={{
//                 backgroundColor: mode === "light" ? theme?.background?.dark : theme?.background?.light,
//                 color: mode === "light" ? theme?.background?.light : theme?.background?.dark,
//             }}
//         >
//             Toggle {mode === "light" ? "Dark" : "Light"} Mode
//         </button>
//     );
// };