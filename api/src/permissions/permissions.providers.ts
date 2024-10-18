import { Connection } from 'mongoose';
import { PermissionSchema } from './entitites/permission.entity';

export const PermissionsProviders = [
    {
        provide: 'PERMISSION_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Permission', PermissionSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
