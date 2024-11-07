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

export function makeSingular(word: string) {
    // Handle irregular words and words that don't just follow the basic rules
    const exceptions: { [key: string]: string } = {
        "modules": "module",
        "roles": "role",
        "children": "child",
        "people": "person",
        "mice": "mouse",
        "geese": "goose",
        "feet": "foot",
        "teeth": "tooth",
        "men": "man",
        "women": "woman"
    };

    // Check if the word is in the exceptions dictionary
    if (exceptions[word.toLowerCase()]) {
        return exceptions[word.toLowerCase()];
    }

    // General rules
    if (word.endsWith("ies")) {
        return word.slice(0, -3) + "y";
    } else if (word.endsWith("ves")) {
        return word.slice(0, -3) + "f";
    } else if (word.endsWith("es")) {
        return word.slice(0, -2);
    } else if (word.endsWith("s")) {
        return word.slice(0, -1);
    } else {
        return word;
    }
}
