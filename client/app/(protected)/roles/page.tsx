'use client';

import RBac from '@/components/hoc/permissions.hoc';
import ListRoles from './components/list';
import { ROLES_READ } from '@/lib/permissions';

export default RBac(function Roles() {
    return <ListRoles />;
}, [ROLES_READ]
)