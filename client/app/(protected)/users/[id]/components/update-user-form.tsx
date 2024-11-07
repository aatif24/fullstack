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
import { MultiSelect } from '@/components/ui/multi-select';
import { useEffect, useState } from 'react';
import { useUsers } from '@/components/providers/users.provider';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import LoaderComponent from '@/components/ui/loader';

const passwordSchema = z.string().optional();
// .min(8, 'Password must be at least 8 characters long')
// .regex(/[A-Za-z]/, 'Password must contain alphabetic characters')
// .regex(/\d/, 'Password must contain at least one number')
// .regex(
//     /[!@#$%^&*(),.?":{}|<>]/,
//     'Password must contain at least one special character',
// );

const FormSchema = z
    .object({
        name: z.string().min(1, {
            message: 'Name can not be empty.',
        }),
        roles: z.array(z.string()).min(1, {
            message: 'Roles can not be empty.',
        }),
        email: z.string().email().min(1, {
            message: 'Name can not be empty.',
        }),
        password: passwordSchema,
        confirmPassword: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'], // This will show the error message at the confirmPassword field
    });

interface IRole {
    value: string;
    label: string;
}

interface IRoleReceived {
    name: string;
    id: string;
}

function UpdateUserForm() {
    const { setRefreshUsers } = useUsers();
    const [loading, setLoading] = useState<boolean>(true);
    const [allRoles, setAllRoles] = useState<IRole[]>([]);
    const [resetRoles, setResetRoles] = useState<boolean>(false);
    const [selectedRoles, setSelectedRoles] = useState<string[]>();

    const { id } = useParams();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            setLoading(true);
            try {
                const [resRoles, resUserDetails] = await Promise.all([
                    fetch(`/api/roles?`, {
                        method: 'GET',
                        signal,
                    }),
                    fetch(`/api/users/${id}?`, {
                        method: 'GET',
                        signal,
                    }),
                ]);

                if (resRoles.ok && resUserDetails.ok) {
                    const rolesData = await resRoles.json();
                    const userData = await resUserDetails.json();
                    setSelectedRoles(userData.roles);
                    form.reset(userData);

                    setAllRoles(
                        rolesData.map((r: IRoleReceived) => ({
                            value: r.id,
                            label: r.name,
                        })),
                    );
                }
            } catch (err) {
                console.log(err);
                if (!signal.aborted) {
                    setLoading(false);
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();
        return () => {
            controller.abort('duplicate request!');
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function handleRoles(data: string[]) {
        form.setValue('roles', data);
        form.clearErrors('roles');
        setSelectedRoles(data);
        setResetRoles(false);
    }

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (res.ok) {
                toast.success(`User "${data.name}" created!`);
                form.reset();
                setResetRoles(true);
                setRefreshUsers(true);
            } else if (res.status == 400) {
                for (const key in result) {
                    //eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                    <LoaderComponent loading={loading} />
                    {loading ? null : (
                        <Form {...form}>
                            <div className="relative ">
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <fieldset className="grid gap-6 rounded-lg border p-4">
                                            <legend className="-ml-1 px-1 text-sm font-medium">
                                                Basic Details
                                            </legend>
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="John Doe"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Email
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="john@example.com"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </fieldset>
                                        <fieldset className="grid gap-6 rounded-lg border p-4 h-fit">
                                            <legend className="-ml-1 px-1 text-sm font-medium">
                                                Manage Password
                                            </legend>
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Password
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="password"
                                                                placeholder="******"
                                                                autoComplete="new-password"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="confirmPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Confirm Password
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="password"
                                                                placeholder="******"
                                                                autoComplete="new-password"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </fieldset>
                                        <fieldset className="grid gap-6 rounded-lg border p-4 h-fit">
                                            <legend className="-ml-1 px-1 text-sm font-medium">
                                                Manage Role
                                            </legend>
                                            <FormField
                                                control={form.control}
                                                name="roles"
                                                render={() => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Roles
                                                        </FormLabel>
                                                        <FormControl>
                                                            <MultiSelect
                                                                asChild
                                                                disabled={
                                                                    loading
                                                                }
                                                                options={
                                                                    allRoles
                                                                }
                                                                onValueChange={
                                                                    handleRoles
                                                                }
                                                                defaultValue={
                                                                    selectedRoles
                                                                }
                                                                placeholder="Select Roles"
                                                                variant="secondary"
                                                                reset={
                                                                    resetRoles
                                                                }
                                                                // animation={2}
                                                                maxCount={3}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="flex justify-between md:justify-start space-x-2">
                                        <Button type="submit" className="w-fit">
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </>
    );
}

export default RBac(UpdateUserForm, [USER_CREATE], 'error');
