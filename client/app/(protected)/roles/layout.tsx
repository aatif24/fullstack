import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { RolesProvider } from '@/components/providers/roles.provider';

export const metadata: Metadata = {
    title: 'Roles | List',
    description: 'List of all roles',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <RolesProvider>
            {children}
            <Toaster position="top-right" closeButton />
        </RolesProvider>
    );
}
