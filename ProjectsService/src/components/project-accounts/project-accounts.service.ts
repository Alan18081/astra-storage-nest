import { injectable, inject } from 'inversify';
import {ProjectAccountsRepository} from './project-accounts.repository';
import {ProjectAccountEntity} from './project-account';
import {CreateAccountDto} from '../../../../Common/src/dto/dto/create-account.dto';
import {FindAccountsListDto} from '../../../../Common/src/dto/dto/find-accounts-list.dto';
import {PaginatedResponse, PaginationDto, HashService} from '@astra/common';

@injectable()
export class ProjectAccountsService {

    @inject(ProjectAccountsRepository)
    private readonly projectAccountRepository: ProjectAccountsRepository;

    @inject(HashService)
    private readonly hashService: HashService;

    async findMany({userId, ...query}: FindAccountsListDto): Promise<ProjectAccountEntity[]> {
        return await this.projectAccountRepository.find(query);
    }

    async findManyWithPagination({ projectId }: FindAccountsListDto, { page, limit }: Required<PaginationDto>): Promise<PaginatedResponse<ProjectAccountEntity>> {
        return await this.projectAccountRepository.findManyWithPagination({ projectId }, { page, limit });
    }

    async findById(id: number): Promise<ProjectAccountEntity | undefined> {
       return await this.projectAccountRepository.findOne({ id });
    }

    async findOneByEmail(email: string): Promise<ProjectAccountEntity | undefined> {
        return await this.projectAccountRepository.findOne({ email, deletedAt: null });
    }

    async createOne(payload: CreateAccountDto): Promise<ProjectAccountEntity> {
        const newAccount = new ProjectAccountEntity(payload);
        newAccount.password = await this.hashService.generateHash(payload.password);

        return await this.projectAccountRepository.save(newAccount);
    }

    async removeOne(id: number): Promise<void> {
        await this.projectAccountRepository.update({ id }, { deletedAt: new Date() });
    }
}