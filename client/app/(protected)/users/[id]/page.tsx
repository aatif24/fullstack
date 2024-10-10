'use client';
import RBac from '@/components/hoc/permissions.hoc';
import { USER_UPDATE } from '@/lib/permissions';

function UpdateUser() {
    return <p>update user</p>;
}

export default RBac(UpdateUser, [USER_UPDATE], 'error'); // Pass ActionUpdateProps as the generic type
