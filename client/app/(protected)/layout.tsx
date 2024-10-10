import Nav from '@/components/ui/nav';
import { BreadcrumbComponent } from '@/components/ui/nav/breadcrumb';
import { UserNav } from '@/components/ui/nav/user-nav';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ThemeProvider } from '@/components/providers/theme.provider';
import { AuthProvider } from '@/components/providers/auth.provider';
import '@/globals.css';
import Link from 'next/link';
import { Triangle } from 'lucide-react';

const geistSans = localFont({
    src: '../../fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: '../../fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'RBac',
    description: 'A sample app to learn RBac',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased `}
            >
                <AuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        enableColorScheme
                    >
                        <header className="fixed top-0  z-50 flex w-full p-4 px-6 backdrop-blur bg-accent/30">
                            <Suspense>
                                <Link
                                    className="mr-4 flex-none items-center justify-center flex"
                                    href="/"
                                >
                                    <Triangle className="w-6 h-6" />
                                </Link>
                                <Nav />
                                <UserNav />
                            </Suspense>
                        </header>
                        <div className="md:max-w-7xl mx-auto md:mt-24 p-4 xl:p-0">
                            <div className="h-full flex-1 flex-col space-y-8 md:flex">
                                <BreadcrumbComponent />
                                {children}
                            </div>
                        </div>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
