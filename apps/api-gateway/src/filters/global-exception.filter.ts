import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { timeStamp } from "console";
import { Request, Response } from "express";





@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter{

    private readonly logger=new Logger(GlobalExceptionFilter.name);

    catch(exception:unknown, host: ArgumentsHost) {
            const ctx=host.switchToHttp();
            const response=ctx.getResponse<Response>();
            const request=ctx.getRequest<Request>();
            const correlationId=request.headers['x-correlation-id'];
            let status=HttpStatus.INTERNAL_SERVER_ERROR;
            let message='Ichki Server xatosi';
            let error='Internal Server error';

            if(exception instanceof HttpException){
                status=exception.getStatus();
                const exceptionResponse=exception.getResponse();

                if(typeof exceptionResponse ==='object'){
                    const res=exceptionResponse as any;
                    message=res.message||message;
                    error=res.error||error;

                }
                else{
                    message=exceptionResponse as string;
                }
            }else if(exception instanceof Error){
                      message = exception.message;

            }
            this.logger.error(
                `[${correlationId}] ${request.method} ${request.url} - ${status} - ${message}`,
            );

            response.status(status).json({
                success:false,
                statusCode:status,
                message,
                error,
                correlationId,
                timeStamp:new Date().toISOString(),
                path:request.url
            })
    }
}