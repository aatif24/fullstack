'use client';
import React, { ComponentType } from 'react';
import { useAuth } from '../providers/auth.provider';
import { redirect } from 'next/navigation';

type Action = 'hide' | 'error' | 'redirect';

// Fix: Remove the incorrect extension of `JSX.IntrinsicAttributes`
function RBac<P>(
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    WrappedComponent: ComponentType<any>,
    requiredPermissions: string[],
    action: Action = 'hide',
): React.FC<P> {
    function Forbidden({ action }: { action: Action }) {
        if (action === 'hide') {
            return null;
        } else if (action === 'error') {
            return (
                <p>
                    You don&apos;t have enough permissions, please contact
                    admin!
                </p>
            );
        } else if (action === 'redirect') {
            return redirect('/forbidden');
        }
        return <p>Forbidden: Unknown action</p>;
    }

    return function wrapper(props: P) {
        //eslint-disable-next-line react-hooks/rules-of-hooks
        const { user } = useAuth();

        if (user) {
            if (user.isSuperAdmin) {
                return <WrappedComponent {...props} />;
            }
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            const hasAllPermissions = requiredPermissions.some((perm: any) => {
                console.log(perm);

                return user.permissions.includes(perm);
            });
            if (!hasAllPermissions) {
                return <Forbidden action={action} />;
            }

            // Forward props to the wrapped component
            return <WrappedComponent {...props} />;
        }

        return null;
    };
}

export default RBac;
