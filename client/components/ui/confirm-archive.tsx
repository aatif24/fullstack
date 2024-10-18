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
    entityToArchive,
    handleArchive,
    setIsAlertOpen,
}: {
    isAlertOpen: boolean;
    entityToArchive: string | null;
    handleArchive: (user: string) => void;
    setIsAlertOpen: (isOpen: boolean) => void;
}) {
    return (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to archive?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can be undone later!.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() =>
                            entityToArchive && handleArchive(entityToArchive)
                        }
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
