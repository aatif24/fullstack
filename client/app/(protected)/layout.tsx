import Nav from '@/components/ui/nav';
import { BreadcrumbComponent } from '@/components/ui/nav/breadcrumb';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ThemeProvider } from '@/components/providers/theme.provider';
import { AuthProvider } from '@/components/providers/auth.provider';
import '@/globals.css';

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


                        <Suspense>
                            <Nav />
                        </Suspense>
                        <div className="md:max-w-7xl mx-auto my-[4rem] md:my-[6rem] lg:my-[8rem] p-4 md:p-6 lg:p-4 xl:p-0">
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
