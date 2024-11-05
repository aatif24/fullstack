import { Connection } from 'mongoose';
import { ThemeSchema } from './entitites/theme.entity';

export const ThemesProviders = [
    {
        provide: 'THEME_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Theme', ThemeSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
