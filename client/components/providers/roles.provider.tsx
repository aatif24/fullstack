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

type TModule = {
    name: string
}

export type TPermission = {
    module: TModule;
    permission: string;
};

// Define a role type that includes the role and permissions
export interface IRole {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    permissions: TPermission[] | null | undefined;
}
export type TSortBy = 'name' | 'email' | 'roles';
export type TSortOrder = 'asc' | 'desc';
// Define the role type and context state
interface RolesContextProps {
    roles: IRole[] | [];
    totalPages: number;
    currentPage: number;
    totalRoles: number;
    loading: boolean;
    error: string | undefined;
    sortBy: TSortBy;
    sortOrder: TSortOrder;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setRefreshRoles: React.Dispatch<React.SetStateAction<boolean>>;
    setTotalRoles: React.Dispatch<React.SetStateAction<number>>;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    search: string | undefined;
    setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
    setSortBy: React.Dispatch<React.SetStateAction<TSortBy>>;
    setSortOrder: React.Dispatch<React.SetStateAction<TSortOrder>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default values
const RolesContext = createContext<RolesContextProps | undefined>(undefined);

// RolesProvider component props
interface RolesProviderProps {
    children: ReactNode;
}

// Custom hook to use RolesContext
export const useRoles = (): RolesContextProps => {
    const context = useContext(RolesContext);
    if (!context) {
        throw new Error('useRoles must be used within an RolesProvider');
    }
    return context;
};
// Create RolesProvider to wrap the app
export const RolesProvider: React.FC<RolesProviderProps> = ({ children }) => {
    const [roles, setRoles] = useState<IRole[] | []>([]);
    const [refreshRoles, setRefreshRoles] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalRoles, setTotalRoles] = useState<number>(10);
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
                const res = await fetch(`/api/roles?${param}`, {
                    method: 'GET',
                    signal,
                });

                if (res.ok) {
                    const result = await res.json();
                    setRoles(result.roles);
                    setTotalPages(result.totalPages);
                    // setCurrentPage(result.currentPage)
                    setTotalRoles(result.totalRoles);
                    setRefreshRoles(false);
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
    }, [currentPage, debouncedQuery, sortBy, sortOrder, refreshRoles]);

    return (
        <RolesContext.Provider
            value={{
                totalPages,
                currentPage,
                totalRoles,
                roles,
                loading,
                error,
                setSearch,
                search,
                setCurrentPage,
                setTotalRoles,
                setTotalPages,
                sortBy,
                sortOrder,
                setSortBy,
                setSortOrder,
                setRefreshRoles,
                setLoading,
            }}
        >
            {children}
        </RolesContext.Provider>
    );
};

// function getPermissionsByKey(role: User) {
//     let permissions: string[] = [];

//     role.roles.forEach((role: Role) => {
//         role.permissions.forEach((permission) => {
//             permissions.push(permission.key);
//         });
//     });

//     return permissions;
// }
