'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import RBac from '@/components/hoc/permissions.hoc';
import { USER_CREATE } from '@/lib/permissions';
import { useEffect, useState } from 'react';
import PermissionCheckboxes from './permissions-checkbox'
import { toast } from 'sonner';
import { useRoles } from '@/components/providers/roles.provider';

const FormSchema = z.object({
    name: z.string().min(1, {
        message: 'Name can not be empty.',
    }),
    permissions: z.array(z.string()).min(1, {
        message: 'Permissions can not be empty.',
    }),
});


function CreateRoleForm() {
    const { setRefreshRoles } = useRoles();
    const [loading, setLoading] = useState<boolean>(true);


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            permissions: [],
        },
    });
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        try {
            const res = await fetch(`/api/roles?`, {
                method: 'POST',
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (res.ok) {
                toast.success(`Role "${data.name}" created!`);
                form.reset();
                setRefreshRoles(true);
            } else if (res.status == 400) {
                for (const key in result) {
                    form.setError(key as any, {
                        message: result[key].join(', '),
                    });
                }
            }
        } catch (err) {
            console.log(err);
            toast.error(`Something went wrong!`);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Card className="relative border-none shadow-none">
                <CardContent className="p-0">
                    <Form {...form}>
                        <div className="relative ">
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div className="grid md:grid-cols-2 gap-4 justify-end items-start">
                                    <fieldset className="grid gap-6 rounded-lg border p-4 h-fit">
                                        <legend className="-ml-1 px-1 text-sm font-medium">
                                            Basic Details
                                        </legend>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Marketing Admin"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </fieldset>

                                    <fieldset className="grid gap-6 rounded-lg border p-4">
                                        <legend className="-ml-1 px-1 text-sm font-medium">
                                            Manage Permissions
                                        </legend>
                                        <FormField
                                            control={form.control}
                                            name="permissions"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <PermissionCheckboxes field={field} form={form as any} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </fieldset>

                                </div>
                                <div className="flex justify-between md:justify-start space-x-2">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="w-fit"
                                        onClick={() => {
                                            form.reset();
                                        }}
                                    >
                                        Reset
                                    </Button>
                                    <Button type="submit" className="w-fit">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
}

export default RBac(CreateRoleForm, [USER_CREATE], 'error');
