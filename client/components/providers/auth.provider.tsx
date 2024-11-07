'use client';

import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
} from 'react';
// Types for roles and permissions

type TModule = {
    name: string;
};
type TPermission = {
    permission: string;
    module: TModule;
};

type Role = {
    permissions: TPermission[];
};

// Define a user type that includes the role and permissions
export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    roles: Role[];
    isSuperAdmin: boolean;
    permissions: TPermission[];
}
// Define the user type and context state
interface AuthContextProps {
    user: User | null;
    loading: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider component props
interface AuthProviderProps {
    children: ReactNode;
}

// Create AuthProvider to wrap the app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/users/me`, {
                    method: 'GET',
                    signal,
                });

                if (res.ok) {
                    const result = await res.json();
                    const userPermissions = getPermissionsByKey(result);
                    result.permissions = userPermissions;
                    setUser(result);
                }
            } catch {
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort('duplicate request!');
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

function getPermissionsByKey(user: User) {
    const permissions: string[] = [];
    permissions.push('profile:read');
    user.roles.forEach((role: Role) => {
        role.permissions.forEach((permission) => {
            permissions.push(
                `${permission?.module?.name}:${permission.permission}`,
            );
        });
    });

    return permissions;
}
