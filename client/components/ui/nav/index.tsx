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
import { Cross1Icon, Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Cross, CrossIcon } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Separator } from '../separator';

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
    const [open, setOpen] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='relative z-50'>
            {/* Main menu on large screens */}
            <div className={cn(`hidden lg:fixed top-0   lg:flex w-full p-4 px-6 backdrop-blur bg-background/30 dark:bg-background/70 transition-all duration-300 -translate-x-1/2 left-1/2`, `${isScrolled && 'border-[0.5px] -translate-x-1/2 w-3/4 shadow rounded-full left-1/2 top-5'}`)}>
                <div className='flex items-center justify-between w-full gap-4'>
                    <Image src="/icon-dark.png" height={100} width={100} className='h-8 w-8  dark:hidden' alt="Dashboard Logo" />
                    <Image src="/icon-light.png" height={100} width={100} className='h-8 w-8  hidden dark:block' alt="Dashboard Logo" />
                    <div className="flex flex-1 items-center space-x-4 mx-4">
                        {
                            navList.map(nav => {
                                const NavLink = RBac(
                                    () => (
                                        <Link className={cn(`capitalize text-sm font-medium  transition-colors text-primary hover:text-primary -mb-1 duration-300 border-b-2 border-b-transparent`,
                                            `${pathname.toLowerCase() == nav.href.toLowerCase() ? ' text-foreground border-b-primary' : 'text-muted-foreground'}`)} href={nav.href} title={nav.description}>
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
            <div className={cn(
                "transition-height border-[0.5px]  duration-300 ease-in-out bg-background  fixed top-5 rounded-lg px-4 py-1 w-[90%] overflow-hidden shadow left-1/2 -translate-x-1/2 lg:hidden h-[2.55rem]",
                `${open && ' h-auto rounded-lg'}`
            )}>
                <div className="flex justify-between w-full gap-4">
                    <div>
                        <Image src="/icon-dark.png" height={100} width={100} className='h-8 w-8  dark:hidden' alt="Dashboard Logo" />
                        <Image src="/icon-light.png" height={100} width={100} className='h-8 w-8  hidden dark:block' alt="Dashboard Logo" />
                    </div>

                    <Button variant="ghost" className='relative h-8 w-8' size={'icon'} onClick={() => setOpen(!open)}>
                        <HamburgerMenuIcon className={cn('absolute left-1/2 -translate-x-1/2 transition-all duration-300  h-6 w-6', `${open && 'h-0 w-0'}`)} />
                        <Cross2Icon className={cn('absolute left-1/2 -translate-x-1/2 transition-all duration-300 h-0 w-0', `${open && 'h-6 w-6'}`)} />
                    </Button>
                </div>
                <div className='p-6 space-y-6'>

                    <div className={cn('mt-4')}>
                        <div className="flex flex-col gap-4">
                            {
                                navList.map(nav => {
                                    const NavLink = RBac(
                                        () => (
                                            <Link onClick={() => setOpen(false)} className={cn(`capitalize w-fit  font-medium  transition-colors text-primary hover:text-primary -mb-1 duration-300 border-b-2 border-b-transparent`,
                                                `${pathname.toLowerCase() == nav.href.toLowerCase() ? ' text-foreground border-b-primary' : 'text-muted-foreground'}`)} href={nav.href} title={nav.description}>
                                                {nav.title}
                                            </Link>
                                        ),
                                        [nav.permission]
                                    );

                                    return <NavLink key={nav.title} />;
                                })
                            }
                        </div>
                    </div>
                    <div className="mt-6">
                        <ClientSwitcher />
                    </div>
                    <div className="flex w-full justify-between mt-6">
                        <ThemeToggle />
                        <UserNav />
                    </div>
                </div>
            </div>
        </div>
    );
}

