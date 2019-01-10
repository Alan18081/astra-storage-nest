import { EntityRepository, Repository } from 'typeorm';
import { ProjectAccount } from './project-account.entity';

@EntityRepository(ProjectAccount)
export class ProjectAccountsRepository extends Repository<ProjectAccount> {

}