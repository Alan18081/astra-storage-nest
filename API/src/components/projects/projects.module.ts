import { ProjectsController } from './projects.controller';
import {Module} from '@nestjs/common';
import {ProjectsService} from './projects.service';

@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService],
})
export class ProjectsModule {}
