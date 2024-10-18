import RBac from '@/components/hoc/permissions.hoc';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { USER_UPDATE } from '@/lib/permissions';
import { Edit } from 'lucide-react';
import Link from 'next/link';

interface ActionUpdateProps {
    id: string;
}

function ActionUpdate({ id }: ActionUpdateProps) {
    return (
        <DropdownMenuItem className="cursor-pointer">
            <Edit className="mr-2 h-3 w-3" />
            <Link href={`/roles/${id}`}>Update</Link>
        </DropdownMenuItem>
    );
}

// Wrap ActionUpdate with RBac, passing the required permissions and action
export default RBac<ActionUpdateProps>(ActionUpdate, [USER_UPDATE]); // Pass ActionUpdateProps as the generic type
