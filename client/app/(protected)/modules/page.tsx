'use client';

import RBac from '@/components/hoc/permissions.hoc';
import ListModules from './components/list';
import { ROLES_READ } from '@/lib/permissions';
import { Suspense } from 'react';
import PageHeader from '@/components/ui/page-header';
import { useModules } from '@/components/providers/modules.provider';

export default RBac(function Modules() {
    const { search, setSearch } = useModules()
    return <div className='md:space-y-8'>
        <PageHeader title={"Modules"} module={'modules'} ctx={'create'} search={search} setSearch={setSearch} />
        <Suspense fallback={<p>loading</p>}>
            <ListModules />
        </Suspense>
    </div>
}, [ROLES_READ]
)