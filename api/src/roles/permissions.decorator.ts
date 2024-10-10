import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission';
export const RequirePermissions = (...roles: string[]) =>
    SetMetadata(PERMISSION_KEY, roles);
