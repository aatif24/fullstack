'use client';

import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export function BreadcrumbComponent() {
    const pathname = usePathname();

    // Split the pathname into an array of segments
    const pathSegments = pathname.split('/').filter(Boolean);

    // Create a function to generate the full path up to the current segment
    const createBreadcrumbPath = (index: number) => {
        return '/' + pathSegments.slice(0, index + 1).join('/');
    };

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    {/* <BreadcrumbLink> */}
                    <Link
                        href="/"
                        className="transition-colors hover:text-foreground flex gap-2 items-center"
                    >
                        Home
                    </Link>
                    {/* </BreadcrumbLink> */}
                </BreadcrumbItem>

                {pathSegments.length > 0 && <BreadcrumbSeparator />}

                {pathSegments.map((segment, index) => {
                    const isLast = index === pathSegments.length - 1;

                    return (
                        <Fragment key={index}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>
                                        {segment.charAt(0).toUpperCase() +
                                            segment.slice(1)}
                                    </BreadcrumbPage>
                                ) : (
                                    // <BreadcrumbLink>
                                    <Link
                                        className="transition-colors hover:text-foreground"
                                        href={createBreadcrumbPath(index)}
                                    >
                                        {segment.charAt(0).toUpperCase() +
                                            segment.slice(1)}
                                    </Link>
                                    // </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
