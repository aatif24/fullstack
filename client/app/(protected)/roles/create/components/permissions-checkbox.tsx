import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Module {
    createdAt: string;
    updatedAt: string;
    __v: number;
    createdBy: string;
    name: string;
    id: string;
}

interface IPermission {
    module: Module;
    permission: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}

export default function PermissionCheckboxes({
    form,
    field,
}: {
    form: UseFormReturn;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any;
}) {
    const [permissions, setPermissions] = useState<IPermission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
        [],
    );

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `/api/permissions?limit=all&sortBy=module`,
                    {
                        method: 'GET',
                        signal,
                    },
                );

                if (res.ok) {
                    const result = await res.json();
                    setPermissions(result?.permissions);
                }
            } catch (err) {
                console.log(err);
            } finally {
            }
        };

        fetchData();
        return () => {
            controller.abort('duplicate request!');
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCheckboxChange = (
        checked: boolean | string,
        permissionId: string,
    ) => {
        setSelectedPermissions((prev) => {
            if (checked) {
                // Add the permissionId if it's checked
                return [...prev, permissionId];
            } else {
                // Remove the permissionId if it's unchecked
                return prev.filter((id) => id !== permissionId);
            }
        });
    };

    useEffect(() => {
        form.setValue('permissions', selectedPermissions);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPermissions]);

    // useEffect(() => {

    //     setSelectedPermissions([]);
    // }, [form.formState.isSubmitSuccessful, reset])

    useEffect(() => {
        if (field.value.length === 0) {
            setSelectedPermissions([]);
        }
    }, [field.value.length]);
    // Function to handle select all checkbox change
    const handleSelectAllChange = (checked: boolean) => {
        if (checked) {
            // Add all permission IDs to selectedPermissions
            const allPermissionIds = permissions.map(
                (permission) => permission.id,
            );
            setSelectedPermissions(allPermissionIds);
            form.setValue('permissions', allPermissionIds);
        } else {
            // Clear all permissions from selectedPermissions
            setSelectedPermissions([]);
            form.setValue('permissions', []);
        }
    };

    // Group permissions by module
    const groupedPermissions = permissions.reduce(
        (acc: { [key: string]: IPermission[] }, permission) => {
            const moduleName = permission?.module?.name;
            if (!acc[moduleName]) {
                acc[moduleName] = [];
            }
            acc[moduleName].push(permission);
            return acc;
        },
        {},
    );

    return (
        <div>
            <div className="flex gap-1 my-2 items-center">
                <Checkbox
                    id={`select-all`}
                    className="rounded-none transition-none"
                    checked={
                        permissions.length > 0 &&
                        permissions.every((permission) =>
                            selectedPermissions.includes(permission.id),
                        )
                    }
                    onCheckedChange={handleSelectAllChange}
                />
                <Label className="capitalize" htmlFor={`select-all`}>
                    Select All
                </Label>
            </div>
            {Object.entries(groupedPermissions).map(
                ([moduleName, modulePermissions]) => (
                    <div key={moduleName}>
                        <p className="capitalize">{moduleName}:</p>
                        <div className="flex gap-2">
                            {modulePermissions
                                .sort((a, b) =>
                                    a.permission.localeCompare(b.permission),
                                )
                                .map(({ id, permission, module }) => (
                                    <div
                                        className="flex gap-1 my-2 items-center"
                                        key={`${module.id}-${permission}`}
                                    >
                                        <Checkbox
                                            id={`${module.id}-${permission}`}
                                            className="rounded-none transition-none"
                                            checked={
                                                !!selectedPermissions.includes(
                                                    id,
                                                )
                                            }
                                            onCheckedChange={(e) =>
                                                handleCheckboxChange(e, id)
                                            }
                                        />
                                        <Label
                                            className="capitalize"
                                            key={id}
                                            htmlFor={`${module.id}-${permission}`}
                                        >
                                            {permission}
                                        </Label>
                                    </div>
                                ))}
                        </div>
                    </div>
                ),
            )}
        </div>
    );
}
