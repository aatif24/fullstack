import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
    ArchiveIcon,
    ArchiveRestoreIcon,
    ArrowDownIcon,
    ArrowUpIcon,
} from 'lucide-react';
import {
    TPermission,
    TSortBy,
    TSortOrder,
    useRoles,
} from '@/components/providers/roles.provider';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Action from './action';
import { toast } from 'sonner';
import ConfirmArchive from '@/components/ui/confirm-archive';
import { Badge } from '@/components/ui/badge';

const headers: { name: TSortBy; hide: boolean; club: string[] }[] = [
    {
        name: 'name',
        hide: false,
        club: [],
    },
];

export default function RoleListTable() {
    const [roleToArchive, setRoleToArchive] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const {
        roles,
        sortBy,
        sortOrder,
        setSortOrder,
        setSortBy,
        setLoading,
        setRefreshRoles,
    } = useRoles();

    async function undoArchive(id: string) {
        setLoading(true);
        try {
            const res = await fetch(`/api/roles/un-archive/${id}`, {
                method: 'PUT',
            });

            if (res.ok) {
                toast.success('Role restored!', {
                    icon: <ArchiveRestoreIcon className="w-4 h-4" />,
                });
                setRefreshRoles(true);
            } else {
                toast.error('Error while un-archiving!', {});
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    async function handleArchive(id: string) {
        setLoading(true);
        try {
            const res = await fetch(`/api/roles/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast.success('Role Archived!', {
                    action: {
                        label: 'Undo',
                        onClick: () => undoArchive(id),
                    },
                    icon: <ArchiveIcon className="w-4 h-4" />,
                });
                setRefreshRoles(true);
            } else {
                toast.error('Error while archiving role!', {});
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    function GroupPermissionsByModule({
        permissions,
    }: {
        permissions: TPermission[] | null | undefined;
    }) {
        const groupedPermissions = permissions?.reduce(
            (acc: { [key: string]: TPermission[] }, permission) => {
                const moduleName = permission?.module?.name;
                if (!acc[moduleName]) {
                    acc[moduleName] = [];
                }
                acc[moduleName].push(permission);
                return acc;
            },
            {},
        );

        if (groupedPermissions) {
            return Object.entries(groupedPermissions).map(
                ([module, permission]) => {
                    return (
                        <div key={module} className="grid grid-cols-2 w-40">
                            <span className="capitalize">{module}:</span>
                            <div className="flex text-xs items-center gap-2">
                                {permission?.map((p) => {
                                    return (
                                        <span key={`${module}-${p.permission}`}>
                                            {p.permission}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    );
                },
            );
        }
        return null;
    }

    return (
        <>
            <Table className="">
                <TableHeader className="">
                    <TableRow className="">
                        {headers.map((h) => {
                            return (
                                <TableHead
                                    key={h.name}
                                    className={cn(
                                        `${sortBy == h.name ? 'bg-muted/50' : ''}`,
                                        h.hide && 'hidden md:table-cell',
                                    )}
                                >
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <span className="flex items-center gap-1 data-[state=open]:bg-muted">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className=" h-8 data-[state=open]:bg-accent"
                                                >
                                                    <span className="capitalize">
                                                        {h.name}
                                                    </span>
                                                    {sortBy === h.name &&
                                                    sortOrder === 'desc' ? (
                                                        <ArrowDownIcon className="ml-2 h-4 w-4" />
                                                    ) : sortBy === h.name &&
                                                      sortOrder === 'asc' ? (
                                                        <ArrowUpIcon className="ml-2 h-4 w-4" />
                                                    ) : (
                                                        <CaretSortIcon className="ml-2 h-4 w-4" />
                                                    )}
                                                </Button>
                                            </span>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className=""
                                            align="start"
                                            forceMount
                                        >
                                            <DropdownMenuRadioGroup
                                                onValueChange={(v) => {
                                                    setSortBy(h.name);
                                                    setSortOrder(
                                                        v as TSortOrder,
                                                    );
                                                }}
                                            >
                                                <DropdownMenuRadioItem
                                                    className="pl-2"
                                                    value="asc"
                                                >
                                                    <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />{' '}
                                                    ASC
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem
                                                    className="pl-2"
                                                    value="desc"
                                                >
                                                    <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />{' '}
                                                    DESC
                                                </DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableHead>
                            );
                        })}
                        <TableHead className="hidden md:table-cell">
                            <span>Modules / Permissions</span>
                        </TableHead>
                        <TableHead className="">
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="rounded-bl-lg">
                    {roles.map((role) => (
                        <TableRow key={role.id} className="">
                            <TableCell
                                className={cn(
                                    'px-5 py-4 font-medium capitalize',
                                    `${sortBy == 'name' ? 'bg-muted/50' : ''}`,
                                )}
                            >
                                {role.name}
                                {role.createdAt &&
                                    (new Date().getTime() -
                                        new Date(role?.createdAt)?.getTime()) /
                                        1000 <=
                                        60 && (
                                        <Badge className="bg-highlight text-dark text-xs mx-2">
                                            New
                                        </Badge>
                                    )}
                            </TableCell>
                            <TableCell
                                className={cn(
                                    'px-5 py-4 font-medium capitalize hidden md:table-cell',
                                )}
                            >
                                <GroupPermissionsByModule
                                    permissions={role?.permissions}
                                />
                            </TableCell>
                            <TableCell className="py-2 text-right space-x-2">
                                <Action
                                    id={role.id}
                                    setRoleToArchive={setRoleToArchive}
                                    setIsAlertOpen={setIsAlertOpen}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ConfirmArchive
                isAlertOpen={isAlertOpen}
                entityToArchive={roleToArchive}
                handleArchive={handleArchive}
                setIsAlertOpen={setIsAlertOpen}
            />
        </>
    );
}
