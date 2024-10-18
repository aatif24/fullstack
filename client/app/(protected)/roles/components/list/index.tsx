'use client';

import RBac from '@/components/hoc/permissions.hoc';
import { TSortBy, TSortOrder, useRoles } from '@/components/providers/roles.provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import LoaderComponent from '@/components/ui/loader';
import { USER_READ } from '@/lib/permissions';
import { PlusIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import RoleListTable from './table';
import { PaginationComponent } from '../../../../../components/ui/pagination-wrapper';
import PageHeader from '@/components/ui/page-header';

function ListRoles() {
    const {
        setSortOrder,
        setSortBy,
        setSearch,
        setCurrentPage,
        search,
        loading,
        totalPages,
        currentPage
    } = useRoles();
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
                <PageHeader title={"roles"} description="Here&apos;s a list of your Roles!" />

                <div className="relative flex gap-4">
                    <Link
                        href="/roles/create"
                        className="w-fit flex items-center"
                    >
                        <Button className="w-full" variant={'secondary'}>
                            <span className="hidden md:inline">
                                New Role &nbsp;
                            </span>
                            <PlusIcon className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Input
                        type="text"
                        className=" w-full md:min-w-[300px]"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        placeholder="Search..."
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
                    <RoleListTable />
                    <PaginationComponent
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage} />
                </CardContent>
            </Card>
        </>
    );
}

export default RBac(ListRoles, [USER_READ]);
