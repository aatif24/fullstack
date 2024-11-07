'use server';

import { redirect } from 'next/navigation';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { FormSchema } from './login.schema';
import { cookies } from 'next/headers';

export async function login(formData: {
    email: string;
    password: string;
}): Promise<
    | {
          status: boolean;
          message: string;
          statusCode: number;
      }
    | undefined
> {
    const parsedForm = FormSchema.safeParse(formData);

    if (parsedForm.success) {
        try {
            const res = await fetch(`${process.env.API_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'content-type': 'application/json',
                    'api-version': '1',
                },
            });
            const status = res.ok;

            const { access_token, message } = await res.json();

            if (status && res.status >= 200 && res.status < 300) {
                cookies().set('token', access_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    expires: new Date(Date.now() + 8 * 60 * 60 * 1000), //8 hours
                    sameSite: true,
                    path: '/',
                });
                redirect('/');
            } else {
                return {
                    status: status,
                    message: message || 'something went wrong!!!',
                    statusCode: res.status,
                };
            }
        } catch (error) {
            if (isRedirectError(error)) {
                // Redirect error handle here
                throw error; // You have to throw the redirect error
            }
            return {
                status: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong.',
                statusCode: 500,
            };
        }
    } else {
        return {
            status: false,
            message: 'Invalid form data!',
            statusCode: 400,
        };
    }
}
