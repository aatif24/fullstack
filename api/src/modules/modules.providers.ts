import { Connection } from 'mongoose';
import { ModuleSchema } from './entitites/module.entitity';

export const ModulesProviders = [
    {
        provide: 'FEATURE_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Module', ModuleSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
