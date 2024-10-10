'use client';
import RBac from '@/components/hoc/permissions.hoc';
import { PROFILE_READ } from '@/lib/permissions';

export default RBac(
    function Home() {
        return (
            <div className="h-full flex-1 flex-col space-y-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Home
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            Here&apos;s a list of your Users!
                        </p>
                    </div>
                    <div className="flex items-center space-x-2"></div>
                </div>
            </div>
        );
    },
    [PROFILE_READ],
);
