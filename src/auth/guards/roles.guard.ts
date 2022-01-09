import {  ROLES_KEYS } from './../decorators/roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEYS,[
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const {user} = context.switchToHttp().getRequest();

    
    return requiredRoles.some((role)=> user?.role?.includes(role));
  }
}
