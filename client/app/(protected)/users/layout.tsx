import type { Metadata } from 'next';
import { UsersProvider } from '@/components/providers/users.provider';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
    title: 'Users | List',
    description: 'List of all users',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <UsersProvider>
            {children}
            <Toaster position="bottom-right" closeButton />
        </UsersProvider>
    );
}
