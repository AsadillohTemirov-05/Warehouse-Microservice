import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role, ROLES_KEY } from "@wms/common";
import { Observable } from "rxjs";




export class RolesGuard implements CanActivate{

    constructor(private reflector:Reflector){}


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles=this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass()
        ]);

        if(!requiredRoles){
            return true;
        };

        const {user}=context.switchToHttp().getRequest();

        if(!user){
                  throw new ForbiddenException('Ruxsat yo\'q');

        }
        const hasRole=requiredRoles.some((role)=>user.role===role);

        if(!hasRole){
                  throw new ForbiddenException('Bu amalni bajarish uchun ruxsat yo\'q');
        };
        return hasRole;
    }
}