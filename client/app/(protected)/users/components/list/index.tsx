'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusIcon, XIcon } from 'lucide-react';
import { UserPagination } from './pagination';
import {
    TSortBy,
    TSortOrder,
    useUsers,
} from '@/components/providers/users.provider';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RBac from '@/components/hoc/permissions.hoc';
import { USER_READ } from '@/lib/permissions';
import UserListTable from './table';
import LoaderComponent from '@/components/ui/loader';

function UserList() {
    const {
        setSortOrder,
        setSortBy,
        setSearch,
        setCurrentPage,
        search,
        loading,
    } = useUsers();
    const currentSearchParams = useSearchParams();

    useEffect(() => {
        const qPage = currentSearchParams.get('page');
        const qSortBy = currentSearchParams.get('sortBy');
        const qSortOrder = currentSearchParams.get('sortOrder');
        const qSearch = currentSearchParams.get('q');

        if (Number(qPage)) {
            setCurrentPage(Number(qPage));
        }
        if (qSortBy) {
            setSortBy(qSortBy as TSortBy);
        }
        if (qSortOrder) {
            setSortOrder(qSortOrder as TSortOrder);
        }
        if (qSearch) {
            setSearch(qSearch);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="md:flex justify-between items-end space-y-6 md:space-y-0">
                <div className="">
                    <h2 className="text-2xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground text-sm">
                        Here&apos;s a list of your Users!
                    </p>
                </div>

                <div className="relative flex gap-4">
                    <Link
                        href="/users/create"
                        className="w-fit flex items-center"
                    >
                        <Button className="w-full" variant={'secondary'}>
                            <span className="hidden md:inline">
                                New User &nbsp;
                            </span>
                            <PlusIcon className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Input
                        type="text"
                        className=" w-full md:min-w-[300px]"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        placeholder="search..."
                    />
                    {search ? (
                        <Button
                            type="button"
                            variant="link"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            onClick={() => setSearch('')}
                        >
                            <XIcon className="h-4 w-4" />
                            <span className="sr-only">Clear</span>
                        </Button>
                    ) : null}
                </div>
            </div>
            <Card className="relative border-none shadow-none">
                <LoaderComponent loading={loading} />
                <CardContent className="p-0 space-y-4 flex flex-col h-full justify-between ">
                    <UserListTable />
                    <UserPagination />
                </CardContent>
            </Card>
        </>
    );
}

export default RBac(UserList, [USER_READ]);
