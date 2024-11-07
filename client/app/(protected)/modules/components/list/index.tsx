'use client';

import RBac from '@/components/hoc/permissions.hoc';
import {
    TSortBy,
    TSortOrder,
    useModules,
} from '@/components/providers/modules.provider';
import { Card, CardContent } from '@/components/ui/card';
import LoaderComponent from '@/components/ui/loader';
import { USER_READ } from '@/lib/permissions';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ModuleListTable from './table';
import { PaginationComponent } from '../../../../../components/ui/pagination-wrapper';

function ListModules() {
    const {
        setSortOrder,
        setSortBy,
        setSearch,
        setCurrentPage,
        loading,
        totalPages,
        currentPage,
    } = useModules();
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
                <ModuleListTable />
                <PaginationComponent
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </CardContent>
        </Card>
    );
}

export default RBac(ListModules, [USER_READ]);
