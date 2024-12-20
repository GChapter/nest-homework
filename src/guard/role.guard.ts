import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { Request } from 'express';

interface CustomRequest extends Request {
  user: any;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ForbiddenException('No token provided');
    }
    try {
      const roles = token;
      const permittedRoles = this.reflector.get(
        ROLES_KEY,
        context.getHandler(),
      );
      if (!permittedRoles) {
        return true;
      }
      if (
        permittedRoles.some((role) => roles.includes(role)) ||
        roles.includes('admin')
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
