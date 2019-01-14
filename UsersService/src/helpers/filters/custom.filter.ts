import {ArgumentsHost, BadRequestException, Catch, RpcExceptionFilter} from '@nestjs/common';
import {RpcException} from '@nestjs/microservices';
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs/internal/observable/throwError';

@Catch()
export class ExceptionFilter implements RpcExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
        return throwError(new BadRequestException(exception.message));
    }
}