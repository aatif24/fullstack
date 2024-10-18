'use client';

import RBac from '@/components/hoc/permissions.hoc';
import ListModules from './components/list';
import { ROLES_READ } from '@/lib/permissions';

export default RBac(function Modules() {
    return <ListModules />;
}, [ROLES_READ]
)