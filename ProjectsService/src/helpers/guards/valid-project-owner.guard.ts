import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs/internal/Observable';
import {ProjectsService} from '../../components/projects/projects.service';

@Injectable()
export class ValidProjectOwnerGuard implements CanActivate {

    constructor(
       private readonly projectsService: ProjectsService,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const data = context.switchToRpc().getData();
        return this.projectsService.isValidOwner(data.id, data.userId);
    }
}