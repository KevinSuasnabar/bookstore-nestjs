import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core'

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly _reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {

    //Se obtendar los roles pasados en el decorador
    const roles: string[] = this._reflector.get<string[]>('roles', context.getHandler());

    //PARA VER SI EL ENDPOINT NECESITAR UN ROL ESPECIAL
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    //desestructuramos los argumentos del request que por defecto tiene user -> cosa de nest
    const { user } = request;

    const hasRole = () => user.roles.some((role: string) => roles.includes(role))//en esos roles esta este rol


    return user && user.roles && hasRole();//si existe el usuario, si tiene roles, si no tiene un rol necesario
  }
}
