import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { ModulesProviders } from './modules.providers';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
    imports: [
        DatabaseModule,
        // UsersModule,
        forwardRef(() => AuthModule),
        forwardRef(() => PermissionsModule),
    ],
    controllers: [ModulesController],
    providers: [ModulesService, ...ModulesProviders],
    exports: [ModulesService],
})
export class ModulesModule {}
