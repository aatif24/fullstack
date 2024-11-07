'use client';
import { Card, CardContent } from '@/components/ui/card';
import {
    TSortBy,
    TSortOrder,
    useUsers,
} from '@/components/providers/users.provider';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RBac from '@/components/hoc/permissions.hoc';
import { USER_READ } from '@/lib/permissions';
import UserListTable from './table';
import LoaderComponent from '@/components/ui/loader';
import { PaginationComponent } from '@/components/ui/pagination-wrapper';

function ListUsers() {
    const {
        setSortOrder,
        setSortBy,
        setSearch,
        setCurrentPage,
        currentPage,
        totalPages,
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
        <Card className="relative border-none shadow-none">
            <LoaderComponent loading={loading} />
            <CardContent className="p-0 space-y-4 flex flex-col h-full justify-between ">
                <UserListTable />
                <PaginationComponent
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </CardContent>
        </Card>
    );
}

export default RBac(ListUsers, [USER_READ]);
