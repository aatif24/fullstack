'use client';

import { useUsers } from '@/components/providers/users.provider';
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '@/components/ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export function UserPagination() {
    const { totalPages, currentPage, setCurrentPage } = useUsers();

    function handlePageChange(action = 'next') {
        if (action == 'next' && currentPage < totalPages) {
            setCurrentPage((p) => ++p);
        } else if (action == 'prev' && currentPage > 1) {
            setCurrentPage((p) => --p);
        }
    }

    return (
        <Pagination className="md:flex md:justify-end">
            <PaginationContent className="flex justify-between w-full md:w-fit">
                <PaginationItem aria-disabled={currentPage <= 1}>
                    <Button
                        variant={'ghost'}
                        disabled={currentPage <= 1}
                        onClick={() => handlePageChange('prev')}
                    >
                        <ChevronLeftIcon className="h-4 w-4" /> Prev
                    </Button>
                </PaginationItem>
                <p className="min-w-12 text-center">{currentPage}</p>
                <PaginationItem aria-disabled={currentPage >= totalPages}>
                    <Button
                        variant={'ghost'}
                        disabled={currentPage >= totalPages}
                        onClick={() => handlePageChange('next')}
                    >
                        Next <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
