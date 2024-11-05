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
import Image from 'next/image';

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
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
            >
                <AuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        enableColorScheme
                    >

                        <header className="fixed top-0  z-50 flex w-full p-4 px-6 backdrop-blur  ">
                            <Suspense>
                                <Link
                                    className="mr-4 flex-none items-center justify-center flex"
                                    href="/"
                                >
                                    <Image src="/icon-dark.png" height={100} width={100} className='h-8 w-8  dark:hidden' alt="Dashboard Logo"/>
                                    <Image src="/icon-light.png" height={100} width={100} className='h-8 w-8  hidden dark:block' alt="Dashboard Logo"/>
                                </Link>
                                <Nav />
                                <UserNav />
                            </Suspense>
                        </header>
                        <div className="md:max-w-7xl mx-auto my-[6rem] p-4 xl:p-0">
                            <div className="h-full flex-1 flex-col space-y-6 md:flex">
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
