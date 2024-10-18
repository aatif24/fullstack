'use client';
import useDebounce from '@/hooks/debounce';
import { usePathname, useRouter } from 'next/navigation';
import qs from 'querystring';
import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
} from 'react';
// Types for roles and permissions
type Permission = {
    [key: string]: string;
};

type Role = {
    name: string;
    permissions: Permission[];
};

// Define a user type that includes the role and permissions
export interface IUser {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    roles: Role[] | null | undefined;
}
export type TSortBy = 'name' | 'email' | 'roles';
export type TSortOrder = 'asc' | 'desc';
// Define the user type and context state
interface UsersContextProps {
    users: IUser[] | [];
    totalPages: number;
    currentPage: number;
    totalUsers: number;
    loading: boolean;
    error: string | undefined;
    sortBy: TSortBy;
    sortOrder: TSortOrder;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setRefreshUsers: React.Dispatch<React.SetStateAction<boolean>>;
    setTotalUsers: React.Dispatch<React.SetStateAction<number>>;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    search: string | undefined;
    setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
    setSortBy: React.Dispatch<React.SetStateAction<TSortBy>>;
    setSortOrder: React.Dispatch<React.SetStateAction<TSortOrder>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default values
const UsersContext = createContext<UsersContextProps | undefined>(undefined);

// UsersProvider component props
interface UsersProviderProps {
    children: ReactNode;
}

// Custom hook to use UsersContext
export const useUsers = (): UsersContextProps => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useUsers must be used within an UsersProvider');
    }
    return context;
};
// Create UsersProvider to wrap the app
export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<IUser[] | []>([]);
    const [refreshUsers, setRefreshUsers] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalUsers, setTotalUsers] = useState<number>(10);
    const [search, setSearch] = useState<string | undefined>();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [sortBy, setSortBy] = useState<TSortBy>('name');
    const [sortOrder, setSortOrder] = useState<TSortOrder>('asc');

    const debouncedQuery = useDebounce(search, 500);

    const pathname = usePathname(); // let's get the pathname to make the component reusable - could be used anywhere in the project
    const router = useRouter();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            setLoading(true);
            const q = {
                sortBy,
                sortOrder,
                q: search || '',
                page: currentPage,
            };
            const param = qs.stringify(q);

            router.push(`${pathname}?${param}`);

            try {
                const res = await fetch(`/api/users?${param}`, {
                    method: 'GET',
                    signal,
                });

                if (res.ok) {
                    const result = await res.json();
                    setUsers(result.users);
                    setTotalPages(result.totalPages);
                    // setCurrentPage(result.currentPage)
                    setTotalUsers(result.totalUsers);
                    setRefreshUsers(false);
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err?.message
                        : 'Something went wrong!',
                );

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
    }, [currentPage, debouncedQuery, sortBy, sortOrder, refreshUsers]);

    return (
        <UsersContext.Provider
            value={{
                totalPages,
                currentPage,
                totalUsers,
                users,
                loading,
                error,
                setSearch,
                search,
                setCurrentPage,
                setTotalUsers,
                setTotalPages,
                sortBy,
                sortOrder,
                setSortBy,
                setSortOrder,
                setRefreshUsers,
                setLoading,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

// function getPermissionsByKey(user: User) {
//     let permissions: string[] = [];

//     user.roles.forEach((role: Role) => {
//         role.permissions.forEach((permission) => {
//             permissions.push(permission.key);
//         });
//     });

//     return permissions;
// }
