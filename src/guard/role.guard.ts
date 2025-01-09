import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { Request } from 'express';

interface CustomRequest extends Request {
  user: any;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permittedRoles = this.reflector.get(ROLES_KEY, context.getHandler());
    if (!permittedRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ForbiddenException('No token provided');
    }
    try {
      const roles = token;
      if (
        permittedRoles.some(
          (role) => roles.toLowerCase() === role.toLowerCase(),
        ) ||
        roles.toLowerCase() === 'admin'
      )
        return true;
      throw new ForbiddenException('lack permission');
    } catch (error) {
      if (error.message === 'lack permission')
        throw new ForbiddenException("You don't have enough permission");
      throw new ForbiddenException('Invalid token');
    }
  }
}
