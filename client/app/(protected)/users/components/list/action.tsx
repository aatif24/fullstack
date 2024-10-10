import RBac from '@/components/hoc/permissions.hoc';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { USER_ARCHIVE, USER_UPDATE } from '@/lib/permissions';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import ActionUpdate from './action-update';
import ActionArchive from './action-archive';
import { Separator } from '@/components/ui/separator';

interface ActionProps {
    setUserToArchive: (id: string) => void;
    setIsAlertOpen: (open: boolean) => void;
    id: string;
}

function Actions({ setUserToArchive, setIsAlertOpen, id }: ActionProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="data-[state=open]:bg-muted">
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="" align="end" forceMount>
                <DropdownMenuGroup className='space-y-1'>
                    <ActionUpdate id={id} />
                    <Separator/>
                    <ActionArchive
                        id={id}
                        setUserToArchive={setUserToArchive}
                        setIsAlertOpen={setIsAlertOpen}
                    />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// Wrap ActionArchive with RBac, passing the required permissions and action
export default RBac<ActionProps>(Actions, [USER_ARCHIVE, USER_UPDATE]); // Pass ActionArchiveProps as the generic type
