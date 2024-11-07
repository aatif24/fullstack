// src/app/api/logout/route.ts
import { logout } from '@/lib/session';

export async function POST() {
    return logout();
    // return NextResponse.redirect(`${process.env.APP_URL}/login`);
}
