import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";





@Injectable()

export class LoggingInterceptor implements NestInterceptor{


    private readonly logger=new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request=context.switchToHttp().getRequest();
        const {method,url,headers}=request;
        const correlationId=headers['x-correlation-id'];
        const start=Date.now();

        return next.handle().pipe(
            tap(()=>{
                const ms=Date.now()-start;
                this.logger.log(
                    `[${correlationId}] ${method} ${url} - ${ms}ms`
                )
            })
        )
    }
}