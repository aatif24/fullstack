import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { DatabaseModule } from 'src/database/database.module';
import { PermissionsProviders } from './permissions.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [PermissionsController],
    providers: [PermissionsService, ...PermissionsProviders],
    exports: [PermissionsService],
})
export class PermissionsModule {}
