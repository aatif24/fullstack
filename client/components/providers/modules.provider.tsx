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

// Define a role type that includes the role and permissions
export interface IModule {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export type TSortBy = 'name' | 'email' | 'modules';
export type TSortOrder = 'asc' | 'desc';
// Define the role type and context state
interface ModulesContextProps {
    modules: IModule[] | [];
    totalPages: number;
    currentPage: number;
    totalModules: number;
    loading: boolean;
    error: string | undefined;
    sortBy: TSortBy;
    sortOrder: TSortOrder;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setRefreshModules: React.Dispatch<React.SetStateAction<boolean>>;
    setTotalModules: React.Dispatch<React.SetStateAction<number>>;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    search: string | undefined;
    setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
    setSortBy: React.Dispatch<React.SetStateAction<TSortBy>>;
    setSortOrder: React.Dispatch<React.SetStateAction<TSortOrder>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default values
const ModulesContext = createContext<ModulesContextProps | undefined>(
    undefined,
);

// ModulesProvider component props
interface ModulesProviderProps {
    children: ReactNode;
}

// Custom hook to use ModulesContext
export const useModules = (): ModulesContextProps => {
    const context = useContext(ModulesContext);
    if (!context) {
        throw new Error('useModules must be used within an ModulesProvider');
    }
    return context;
};
// Create ModulesProvider to wrap the app
export const ModulesProvider: React.FC<ModulesProviderProps> = ({
    children,
}) => {
    const [modules, setModules] = useState<IModule[] | []>([]);
    const [refreshModules, setRefreshModules] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalModules, setTotalModules] = useState<number>(10);
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
                const res = await fetch(`/api/modules?${param}`, {
                    method: 'GET',
                    signal,
                });

                if (res.ok) {
                    const result = await res.json();
                    setModules(result.modules);
                    setTotalPages(result.totalPages);
                    // setCurrentPage(result.currentPage)
                    setTotalModules(result.totalModules);
                    setRefreshModules(false);
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
    }, [currentPage, debouncedQuery, sortBy, sortOrder, refreshModules]);

    return (
        <ModulesContext.Provider
            value={{
                totalPages,
                currentPage,
                totalModules,
                modules,
                loading,
                error,
                setSearch,
                search,
                setCurrentPage,
                setTotalModules,
                setTotalPages,
                sortBy,
                sortOrder,
                setSortBy,
                setSortOrder,
                setRefreshModules,
                setLoading,
            }}
        >
            {children}
        </ModulesContext.Provider>
    );
};

// function getPermissionsByKey(role: User) {
//     let permissions: string[] = [];

//     role.modules.forEach((role: Module) => {
//         role.permissions.forEach((permission) => {
//             permissions.push(permission.key);
//         });
//     });

//     return permissions;
// }
