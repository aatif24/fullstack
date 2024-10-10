import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './permissions.decorator';

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
        const { user } = context.switchToHttp().getRequest();
        const permissions = getPermissionsByKey(user);

        const per = requiredPermissions.some((permissoin) =>
            permissions?.includes(permissoin),
        );
        return per;
    }
}

function getPermissionsByKey(user) {
    let permissions = [];

    user.roles.forEach((role) => {
        role.permissions.forEach((permission) => {
            permissions.push(permission.key);
        });
    });

    return permissions;
}
