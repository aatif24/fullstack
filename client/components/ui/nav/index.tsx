'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description:
            'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
        title: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description:
            'For sighted users to preview content available behind a link.',
    },
    {
        title: 'Progress',
        href: '/docs/primitives/progress',
        description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
        title: 'Scroll-area',
        href: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.',
    },
    {
        title: 'Tabs',
        href: '/docs/primitives/tabs',
        description:
            'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
        title: 'Tooltip',
        href: '/docs/primitives/tooltip',
        description:
            'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
];

export default function Nav() {
    return (
        <NavigationMenu
            className="z-50 grow justify-start"
            onPointerLeave={(event) => event.preventDefault()}
        >
            <NavigationMenuList
                onPointerLeave={(event) => event.preventDefault()}
            >
                <NavigationMenuItem
                    onPointerLeave={(event) => event.preventDefault()}
                >
                    <NavigationMenuTrigger
                        className="bg-0"
                        onPointerMove={(event) => event.preventDefault()}
                        onPointerLeave={(event) => event.preventDefault()}
                    >
                        Master
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                        onPointerLeave={(event) => event.preventDefault()}
                    >
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/users"
                                    >
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            Users
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Manage and oversee the users in the system, including creation, updates, and role assignments.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/modules" title="Modules">
                                Configure and manage different system functionalities or features.
                            </ListItem>
                            <ListItem href="/roles" title="Roles">
                                Define user roles and set permissions for various modules.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem
                    onPointerLeave={(event) => event.preventDefault()}
                >
                    <NavigationMenuTrigger
                        className="bg-0"
                        onPointerMove={(event) => event.preventDefault()}
                        onPointerLeave={(event) => event.preventDefault()}
                    >
                        Components
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                        onPointerLeave={(event) => event.preventDefault()}
                    >
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem
                    onPointerLeave={(event) => event.preventDefault()}
                >
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={cn(
                                navigationMenuTriggerStyle(),
                                'hidden md:inline',
                                'bg-0',
                            )}
                        >
                            Documentation
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={props.href as string}
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className,
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';
