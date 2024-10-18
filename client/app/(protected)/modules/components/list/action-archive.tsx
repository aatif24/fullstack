import { ArchiveIcon } from 'lucide-react';
import RBac from '@/components/hoc/permissions.hoc';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { USER_ARCHIVE } from '@/lib/permissions';

interface ActionArchiveProps {
    setModuleToArchive: (id: string) => void;
    setIsAlertOpen: (open: boolean) => void;
    id: string;
}

function ActionArchive({
    setModuleToArchive,
    setIsAlertOpen,
    id,
}: ActionArchiveProps) {
    return (
        <DropdownMenuItem
            className="text-destructive focus:text-destructive cursor-pointer"
            onClick={() => {
                setModuleToArchive(id);
                setIsAlertOpen(true);
            }}
        >
            <ArchiveIcon className="mr-2 h-3 w-3" />
            <span>Archive</span>
        </DropdownMenuItem>
    );
}

export default RBac<ActionArchiveProps>(ActionArchive, [USER_ARCHIVE]);
