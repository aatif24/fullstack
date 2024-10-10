import { Connection } from 'mongoose';
import { RoleSchema } from './entitites/role.entitity';
import { PermissionSchema } from './entitites/permission.entity';

export const RolesProviders = [
    {
        provide: 'ROLE_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Role', RoleSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'PERMISSION_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Permission', PermissionSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
