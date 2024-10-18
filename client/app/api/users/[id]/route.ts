
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const token = req.cookies.get('token')?.value;
        const { id } = params;

        const res = await fetch(`${process.env.API_URL}/users/${id}`, {
            method: "GET",
            headers: {
                'api-version': "1",
                "content-type": "application/json",
                'authorization': `Bearer ${token}`
            }
        })
        return NextResponse.json(
            await res.json(),
            { status: res.status }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "something went wrong",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const token = req.cookies.get('token')?.value;
        const { id } = params;

        const res = await fetch(`${process.env.API_URL}/users/${id}`, {
            method: "DELETE",
            headers: {
                'api-version': "1",
                "content-type": "application/json",
                'authorization': `Bearer ${token}`
            }
        })
        return NextResponse.json(
            await res.json(),
            { status: res.status }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "something went wrong",
            },
            { status: 500 }
        );
    }
}
