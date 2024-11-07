'use client';
import RBac from '@/components/hoc/permissions.hoc';
import { USER_UPDATE } from '@/lib/permissions';
import UpdateUserForm from './components/update-user-form';
import PageHeader from '@/components/ui/page-header';

function UpdateUser() {
    return (
        <>
            <PageHeader title="Users" description={'Update User'} />
            <UpdateUserForm />
        </>
    );
}

export default RBac(UpdateUser, [USER_UPDATE], 'error'); // Pass ActionUpdateProps as the generic type
