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
    TSortBy,
    TSortOrder,
    useModules,
} from '@/components/providers/modules.provider';
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
        club: ['email', 'modules'],
    }
];

export default function ModuleListTable() {
    const [moduleToArchive, setModuleToArchive] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const {
        modules,
        sortBy,
        sortOrder,
        setSortOrder,
        setSortBy,
        setLoading,
        setRefreshModules,
    } = useModules();

    async function undoArchive(id: string) {
        setLoading(true);
        try {
            const res = await fetch(`/api/modules/un-archive/${id}`, {
                method: 'PUT',
            });

            if (res.ok) {
                toast.success('Module restored!', {
                    icon: <ArchiveRestoreIcon className="w-4 h-4" />,
                });
                setRefreshModules(true);
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
            const res = await fetch(`/api/modules/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast.success('Module Archived!', {
                    action: {
                        label: 'Undo',
                        onClick: () => undoArchive(id),
                    },
                    icon: <ArchiveIcon className="w-4 h-4" />,
                });
                setRefreshModules(true);
            } else {
                toast.error('Error while archiving module!', {});
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
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
                        <TableHead className="md:w-[200px]">
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="rounded-bl-lg">
                    {modules.map((module) => (
                        <TableRow key={module.id} className="">
                            <TableCell
                                className={cn(
                                    'px-5 py-4 font-medium capitalize',
                                    `${sortBy == 'name' ? 'bg-muted/50' : ''}`,
                                )}
                            >
                                {module.name}
                                {(module.createdAt && ((new Date().getTime() - new Date(module?.createdAt)?.getTime()) / 1000 <= 60)) && <Badge className="bg-highlight text-dark text-xs mx-2">New</Badge>}
                            </TableCell>
                            <TableCell className="py-2 text-right space-x-2">
                                <Action
                                    id={module.id}
                                    setModuleToArchive={setModuleToArchive}
                                    setIsAlertOpen={setIsAlertOpen}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ConfirmArchive
                isAlertOpen={isAlertOpen}
                entityToArchive={moduleToArchive}
                handleArchive={handleArchive}
                setIsAlertOpen={setIsAlertOpen}
            />
        </>
    );
}
