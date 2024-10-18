import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { ModulesProvider } from '@/components/providers/modules.provider';

export const metadata: Metadata = {
    title: 'Modules | List',
    description: 'List of all modules',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ModulesProvider>
            {children}
            <Toaster position="bottom-right" closeButton />
        </ModulesProvider>
    );
}
