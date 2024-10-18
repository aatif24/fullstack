import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesModule } from './roles/roles.module';
import { PermissionsGuard } from './roles/permission.guard';
import { LoggerMiddleware } from './app.middleware';
import { ModulesController } from './modules/modules.controller';
import { ModulesService } from './modules/modules.service';
import { ModulesModule } from './modules/modules.module';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        DatabaseModule,
        RolesModule,
        ModulesModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PermissionsGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*'); // apply to all routes
    }
}
