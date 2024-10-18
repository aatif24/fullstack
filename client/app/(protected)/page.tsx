'use client';
import RBac from '@/components/hoc/permissions.hoc';
import PageHeader from '@/components/ui/page-header';
import { PROFILE_READ } from '@/lib/permissions';

export default RBac(
    function Home() {
        return (
            <div className="h-full flex-1 flex-col space-y-8 md:flex">
                <PageHeader title='Home' description="Here&apos;s a dashboard!"/>
            </div>
        );
    },
    [PROFILE_READ],
);
