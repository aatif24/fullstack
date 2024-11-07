import { Connection } from 'mongoose';
import { RoleSchema } from './entitites/role.entitity';

export const RolesProviders = [
    {
        provide: 'ROLE_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Role', RoleSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
