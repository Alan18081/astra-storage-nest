import {ArgumentsHost, BadRequestException, Catch} from '@nestjs/common';
import {RpcException} from '@nestjs/microservices';
import {BaseExceptionFilter} from '@nestjs/core';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost): void {
        console.log('Some new exception', exception);
        super.catch(new BadRequestException(exception), host);
    }
}