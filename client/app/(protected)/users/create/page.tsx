'use client';

import CreateUserForm from './components/create-user-form';

export default function TaskPage() {
    return (
        <div className="h-full flex-1 flex-col space-y-8 md:flex">
            <CreateUserForm />
        </div>
    );
}
