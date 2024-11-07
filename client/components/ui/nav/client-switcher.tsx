'use client';

import * as React from 'react';
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const groups = [
    {
        label: 'Clients',
        teams: [
            {
                label: 'Koch',
                value: 'personal',
            },
            {
                label: 'Acme Inc.',
                value: 'acme-inc',
            },
            {
                label: 'Monsters Inc.',
                value: 'monsters',
            },
        ],
    },
];

type Client = (typeof groups)[number]['teams'][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
    typeof PopoverTrigger
>;
//eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ClientSwitcherProps extends PopoverTriggerProps {}

export default function ClientSwitcher({ className }: ClientSwitcherProps) {
    const [open, setOpen] = React.useState(false);
    const [showNewClientDialog, setShowNewClientDialog] = React.useState(false);
    const [selectedClient, setSelectedClient] = React.useState<Client>(
        groups[0].teams[0],
    );

    return (
        <Dialog
            open={showNewClientDialog}
            onOpenChange={setShowNewClientDialog}
        >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a team"
                        className={cn(
                            'lg:w-[200px] w-full justify-between',
                            className,
                        )}
                    >
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src={`https://avatar.vercel.sh/${selectedClient.value}.png`}
                                alt={selectedClient.label}
                                className="grayscale"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {selectedClient.label}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search team..." />
                        <CommandList>
                            <CommandEmpty>No team found.</CommandEmpty>
                            {groups.map((group) => (
                                <CommandGroup
                                    key={group.label}
                                    heading={group.label}
                                >
                                    {group.teams.map((team) => (
                                        <CommandItem
                                            key={team.value}
                                            onSelect={() => {
                                                setSelectedClient(team);
                                                setOpen(false);
                                            }}
                                            className="text-sm"
                                        >
                                            <Avatar className="mr-2 h-5 w-5">
                                                <AvatarImage
                                                    src={`https://avatar.vercel.sh/${team.value}.png`}
                                                    alt={team.label}
                                                    className="grayscale"
                                                />
                                                <AvatarFallback>
                                                    SC
                                                </AvatarFallback>
                                            </Avatar>
                                            {team.label}
                                            <CheckIcon
                                                className={cn(
                                                    'ml-auto h-4 w-4',
                                                    selectedClient.value ===
                                                        team.value
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false);
                                            setShowNewClientDialog(true);
                                        }}
                                    >
                                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                                        Create Client
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create team</DialogTitle>
                    <DialogDescription>
                        Add a new team to manage products and customers.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Client name</Label>
                            <Input id="name" placeholder="Acme Inc." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="plan">Subscription plan</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">
                                        <span className="font-medium">
                                            Free
                                        </span>{' '}
                                        -{' '}
                                        <span className="text-muted-foreground">
                                            Trial for two weeks
                                        </span>
                                    </SelectItem>
                                    <SelectItem value="pro">
                                        <span className="font-medium">Pro</span>{' '}
                                        -{' '}
                                        <span className="text-muted-foreground">
                                            $9/month per user
                                        </span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setShowNewClientDialog(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
