// src/app/api/logout/route.ts
import { deleteSession, logout } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST() {
    return logout();
    // return NextResponse.redirect(`${process.env.APP_URL}/login`);
}