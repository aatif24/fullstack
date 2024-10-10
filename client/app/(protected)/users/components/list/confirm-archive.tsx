import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function ConfirmArchive({
    isAlertOpen,
    userToArchive,
    handleArchive,
    setIsAlertOpen,
}: {
    isAlertOpen: boolean;
    userToArchive: string | null;
    handleArchive: (user: string) => void;
    setIsAlertOpen: (isOpen: boolean) => void;
}) {
    return (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to archive this user?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can be undone later, but the user will lose
                        access to their account temporarily.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() =>
                            userToArchive && handleArchive(userToArchive)
                        }
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
