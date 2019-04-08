import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Roles } from '@bit/alan18081.astra-storage.common.dist/enums';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    return req.user.roleId === Roles.ADMIN;
  }
}
