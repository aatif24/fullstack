'use client';
import { Suspense } from 'react';
import UserList from './components/list';
import { USER_READ } from '@/lib/permissions';
import RBac from '@/components/hoc/permissions.hoc';
import PageHeader from '@/components/ui/page-header';
import { useUsers } from '@/components/providers/users.provider';

export default RBac(
    function Users() {
        const { search, setSearch } = useUsers();
        return (
            <div className="md:space-y-8 space-y-6">
                <PageHeader
                    title={'Users'}
                    module={'users'}
                    ctx={'create'}
                    search={search}
                    setSearch={setSearch}
                />
                <Suspense fallback={<p>loading</p>}>
                    <UserList />
                </Suspense>
            </div>
        );
    },
    [USER_READ],
);
