import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Users | Update',
    description: 'List of all users',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
