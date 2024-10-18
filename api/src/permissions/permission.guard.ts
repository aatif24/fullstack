import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../permissions/permissions.decorator';
import { IUser } from 'src/users/entities/users.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<
            Permissions[]
        >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

        if (!requiredPermissions) {
            return true;
        }

        const { user, path } = context.switchToHttp().getRequest();

        if (user.isSuperAdmin) {
            return true;
        }

        const module = path.split('/')[1];

        const userPermissions = getPermissionsByKey(user);

        const isAllowed = requiredPermissions.some((permission) =>
            userPermissions?.includes(`${module}:${permission}`),
        );

        return isAllowed;
    }
}

function getPermissionsByKey(user: IUser) {
    let permissions = [];

    user.roles.forEach((role) => {
        role.permissions.forEach((permission) => {
            permission &&
                permissions.push(
                    `${permission.module}:${permission.permission}`,
                );
        });
    });

    return permissions;
}
