import { ArgumentsHost, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs/internal/Observable';
export declare class ServiceExceptionFilter implements RpcExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost): Observable<any>;
}
