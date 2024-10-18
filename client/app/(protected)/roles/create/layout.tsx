import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
    title: 'Roles | Create',
    description: 'Create a new role',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
            <Toaster position="top-right" closeButton />
        </>
    );
}
