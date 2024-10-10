import { Connection } from 'mongoose';
import { AuthSchema } from './entities/auth.entity';

export const AuthProviders = [
    {
        provide: 'AUTH_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Auth', AuthSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
