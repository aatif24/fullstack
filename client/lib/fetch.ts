'use server';

import { cookies } from 'next/headers';

export async function fetchWithAuth<T>(
    url: string,
    options: RequestInit = {},
    signal: string,
): Promise<T | null> {
    // Get the token from localStorage, cookies, or wherever you store it
    const token = cookies().get('token')?.value;
    console.log('signal', signal);
    // Set the Authorization header
    const headers: HeadersInit = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    // Make the fetch request with the token, including the `signal` for abort
    const response = await fetch(`${process.env.API_URL}${url}`, {
        ...options,
        headers,
        signal: JSON.parse(signal),
    });

    if (response.status === 401) {
        // Handle Unauthorized (e.g., token expired, invalid token)
        cookies().delete('token');
    }

    if (!response.ok) {
        // Handle other types of errors
        const error: { message: string } = await response.json();
        throw new Error(error.message || 'An error occurred');
    }

    return response.json() as Promise<T>; // Return the data with type `T`
}
