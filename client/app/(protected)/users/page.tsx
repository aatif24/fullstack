'use client';
import { Suspense } from 'react';
import UserList from './components/list';

export default function Users() {
    return (
        <div className="h-full flex-1 flex-col space-y-8 md:flex">
            <Suspense fallback={<p>loading</p>}>
                <UserList />
            </Suspense>
        </div>
    );
}
