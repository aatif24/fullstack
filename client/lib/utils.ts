import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function encryptText(plainText: string) {
    const data = JSON.stringify({ timestamp: new Date(), value: plainText });
    return crypto.publicEncrypt(
        {
            key: process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY as string,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        // We convert the data string to a buffer
        Buffer.from(data)
    );
}


export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
