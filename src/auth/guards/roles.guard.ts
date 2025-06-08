import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedUser } from 'src/common/interfaces/authenticated-user.interface';
import { Role } from 'src/users/entities/user.entity';

import { ROLE } from '../constants/role.constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role>(ROLE, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) return true;

    const request: AuthenticatedUser = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === Role.ADMIN) return true;

    if (!requireRoles.includes(user.role)) {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
