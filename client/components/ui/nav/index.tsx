'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import ClientSwitcher from './client-switcher';
import Image from 'next/image';
import { UserNav } from './user-nav';
import { MODULE_READ, PROFILE_READ, ROLES_READ, USER_READ } from '@/lib/permissions';
import RBac from '@/components/hoc/permissions.hoc';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { ThemeToggle } from './theme-toggle';

const navList: { title: string; href: string; description: string, permission: string }[] = [
    {
        title: 'users',
        href: '/users',
        permission: USER_READ,
        description:
            'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
        title: 'modules',
        href: '/modules',
        permission: MODULE_READ,
        description:
            'For sighted users to preview content available behind a link.',
    },
    {
        title: 'roles',
        href: '/roles',
        permission: ROLES_READ,
        description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
        title: 'docs',
        href: '/documentation',
        permission: PROFILE_READ,
        description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    }
];

export default function Nav() {
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);


    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <div className='relative z-50'>
            {/* Main menu on large screens */}
            <div className={cn(`hidden lg:fixed top-0   lg:flex w-full p-4 px-6 backdrop-blur bg-background/30 dark:bg-background/70 transition-all duration-300 -translate-x-1/2 left-1/2`, `${isScrolled && 'border-[0.5px] dark:border-0 dark:shadow-foreground/20  w-3/4 shadow rounded-full top-5'}`)}>
                <div className='flex items-center justify-between w-full gap-4'>
                    <Image src="/icon-dark.png" height={100} width={100} className='h-8 w-8  dark:hidden' alt="Dashboard Logo" />
                    <Image src="/icon-light.png" height={100} width={100} className='h-8 w-8  hidden dark:block' alt="Dashboard Logo" />
                    <div className="flex flex-1 items-center space-x-4 mx-4">
                        {
                            navList.map(nav => {
                                const NavLink = RBac(
                                    () => (
                                        <Link className={cn(`capitalize text-sm font-medium  transition-colors text-primary hover:text-primary -mb-1 duration-300 border-b-2 border-b-transparent`,
                                            `${pathname.toLowerCase().includes(nav.href.replaceAll('/', '')) ? ' text-foreground border-b-primary' : 'text-muted-foreground'}`)} href={nav.href} title={nav.description}>
                                            {nav.title}
                                        </Link>
                                    ),
                                    [nav.permission]
                                );

                                return <NavLink key={nav.title} />;
                            })
                        }
                    </div>
                    <ClientSwitcher />
                    <ThemeToggle />
                    <UserNav />
                </div>
            </div>
            <MobileNav />
        </div>
    );
}

function MobileNav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed z-50 lg:hidden top-5 w-[90%] left-1/2 -translate-x-1/2">
            <div className={cn("transition-all duration-300 bg-background shadow dark:shadow-muted rounded-lg border-0 w-full ", open ? 'p-6 space-y-6' : 'p-0')}>
                <div className="flex justify-between items-center p-2">
                    <div>
                        <Image src="/icon-dark.png" height={100} width={100} className="h-8 w-8 dark:hidden" alt="Dashboard Logo" />
                        <Image src="/icon-light.png" height={100} width={100} className="h-8 w-8 hidden dark:inline" alt="Dashboard Logo" />
                    </div>

                    <Button variant="ghost" className='relative h-8 w-8' size={'icon'} onClick={() => setOpen(!open)}>
                        <HamburgerMenuIcon className={cn('absolute left-1/2 -translate-x-1/2 transition-all duration-300  h-6 w-6', `${open && 'h-0 w-0'}`)} />
                        <Cross2Icon className={cn('absolute left-1/2 -translate-x-1/2 transition-all duration-300 h-0 w-0', `${open && 'h-6 w-6'}`)} />
                    </Button>
                </div>

                {/* Sliding Menu Content */}
                <div
                    className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        open ? "max-h-screen" : "max-h-0"
                    )}
                >
                    <div className="p-2 space-y-6">
                        <div className="flex flex-col gap-4 bg-muted p-4 rounded-lg">
                            {navList.map((nav) => {
                                const NavLink = RBac(
                                    () => (
                                        <Link
                                            onClick={() => setOpen(false)}
                                            className={cn(
                                                "capitalize font-medium transition-colors text-primary hover:text-primary duration-300 border-b-2 border-b-transparent",
                                                pathname.toLowerCase() === nav.href.toLowerCase()
                                                    ? "text-foreground border-b-primary"
                                                    : "text-muted-foreground"
                                            )}
                                            href={nav.href}
                                            title={nav.description}
                                        >
                                            {nav.title}
                                        </Link>
                                    ),
                                    [nav.permission]
                                );

                                return <NavLink key={nav.title} />;
                            })}
                        </div>
                        <div className="">
                            <ClientSwitcher />
                        </div>
                        <div className="flex w-full justify-between items-center bg-muted rounded-lg p-4">
                            <ThemeToggle />
                            <UserNav />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}