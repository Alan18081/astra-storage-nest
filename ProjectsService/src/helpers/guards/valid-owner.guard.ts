import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs/internal/Observable';
import {ProjectsService} from '../../components/projects/projects.service';

@Injectable()
export class ValidOwnerGuard implements CanActivate {

    constructor(
       private readonly projectsService: ProjectsService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const data = context.switchToRpc().getData();
        return this.projectsService.isValidOwner(data.id, data.userId);
    }
}