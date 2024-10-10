import { Connection } from 'mongoose';
import { UserSchema } from './entities/users.entity';

export const UserProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('User', UserSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
