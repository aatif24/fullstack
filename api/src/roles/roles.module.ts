import { forwardRef, Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesProviders } from './roles.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ModulesModule } from 'src/modules/modules.module';

@Module({
    imports: [
        DatabaseModule,
        // UsersModule,
        forwardRef(() => AuthModule),
        forwardRef(() => ModulesModule),
    ],
    controllers: [RolesController],
    providers: [RolesService, ...RolesProviders],
})
export class RolesModule {}
