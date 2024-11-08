import 'server-only';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface SessionPayload extends JWTPayload {
    access_token: string;
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(encodedKey);
}

export async function decrypt(
    session: string | undefined = '',
): Promise<SessionPayload | undefined> {
    try {
        const { payload }: { payload: SessionPayload } = await jwtVerify(
            session,
            encodedKey,
            {
                algorithms: ['HS256'],
            },
        );
        return payload;
    } catch (error) {
        console.error(` -------------------------------------`);
        console.error(`file: session.ts:36 ~ error:`, error);
        console.error(` -------------------------------------`);

        console.log('Failed to verify session');
    }
}

export async function createSession(
    payload: SessionPayload,
    time: number = 60,
) {
    const expiresAt = new Date(Date.now() + time * 1000);
    const session = await encrypt(payload);
    try {
        cookies().set('token', session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: expiresAt,
            sameSite: true,
            path: '/',
        });
        return session;
    } catch (error) {
        console.error('Failed to verify session', error);
    }
}

export async function updateSession() {
    const session = cookies().get('session')?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });
}

export function deleteSession() {
    cookies().delete('token');
}

export async function logout() {
    deleteSession();
    redirect('/login');
}
