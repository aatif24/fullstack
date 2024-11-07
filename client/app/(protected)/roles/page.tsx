'use client';

import RBac from '@/components/hoc/permissions.hoc';
import ListRoles from './components/list';
import { ROLES_READ } from '@/lib/permissions';
import { Suspense } from 'react';
import PageHeader from '@/components/ui/page-header';
import { useRoles } from '@/components/providers/roles.provider';

const Roles = RBac(
    function Roles() {
        const { search, setSearch } = useRoles();

        return (
            <div className="md:space-y-8 space-y-6">
                <PageHeader
                    title={'Roles'}
                    module={'roles'}
                    ctx={'create'}
                    search={search}
                    setSearch={setSearch}
                />
                <Suspense fallback={<p>loading</p>}>
                    <ListRoles />
                </Suspense>
            </div>
        );
    },
    [ROLES_READ],
);

export default Roles;
