import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;
        const res = await fetch(`${process.env.API_URL}/users/me`, {
            method: 'GET',
            headers: {
                'api-version': '1',
                authorization: `Bearer ${token}`,
            },
        });

        return NextResponse.json(await res.json(), { status: res.status });
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : 'something went wrong',
            },
            { status: 500 },
        );
    }
}
