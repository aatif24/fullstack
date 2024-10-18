import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
    title: 'Modules | Create',
    description: 'Create a new module',
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
