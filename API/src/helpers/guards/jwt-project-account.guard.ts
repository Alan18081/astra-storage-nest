import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import { Observable } from 'rxjs';
import {AuthService} from '../../components/auth/auth.service';

@Injectable()
export class JwtProjectAccountGuard implements CanActivate {

    constructor(
       private readonly authService: AuthService,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.authService.validateProjectAccount(request);
    }
}