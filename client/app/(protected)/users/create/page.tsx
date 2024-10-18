'use client';

import RBac from '@/components/hoc/permissions.hoc';
import CreateUserForm from './components/create-user-form';
import { USER_CREATE } from '@/lib/permissions';
import PageHeader from '@/components/ui/page-header';

export default RBac(function TaskPage() {
    return (
        <div className="h-full flex-1 flex-col space-y-8 md:flex">
            <PageHeader title="Users" description={"Create a new User"}/>
            <CreateUserForm />
        </div>
    );
}, [USER_CREATE]
)