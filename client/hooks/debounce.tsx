import { useState, useRef, useEffect } from 'react';

// Debounce hook
function useDebounce(
    value: string | undefined | number | null,
    delay: number,
): string | undefined | number | null {
    const [debouncedValue, setDebouncedValue] = useState<
        string | undefined | number | null
    >(value);
    const timer = useRef<number | null>(null); // Use number for browser environments

    useEffect(() => {
        // Clear the previous timer if there is one
        if (timer.current !== null) {
            clearTimeout(timer.current);
        }

        // Set up a new timer
        timer.current = window.setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup on component unmount
        return () => {
            if (timer.current !== null) {
                clearTimeout(timer.current);
            }
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
