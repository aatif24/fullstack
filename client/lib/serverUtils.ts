// import "server-only";
import crypto, { privateDecrypt } from "crypto";
import fs from "fs";

export async function decryptText(encryptedText: string) {
    const privateKey = fs.readFileSync("private.pem", "utf8");
    return privateDecrypt(
        {
            key: privateKey as string,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        },
        Buffer.from(encryptedText, "base64")
    );
}
