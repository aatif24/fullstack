import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Users | Create',
    description: 'Create a new user',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
