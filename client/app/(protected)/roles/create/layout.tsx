import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Roles | Create',
    description: 'Create a new role',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
