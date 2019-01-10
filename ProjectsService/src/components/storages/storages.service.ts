import { Messages, PaginatedResponse } from '@astra/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage} from './storage.entity';
import {StoragesRepository} from './storages.repository';
import { Injectable } from '@nestjs/common';
import { CreateStorageDto, FindStoragesListDto } from '@astra/common/dto';
import { ProjectsRepository } from '../projects/projects.repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class StoragesService {

  constructor(
    @InjectRepository(StoragesRepository)
    private readonly storagesRepository: StoragesRepository,
    @InjectRepository(ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository,
  ) {}

  async findManyByProject({ projectId, userId, page, limit }: FindStoragesListDto): Promise<Storage[] | PaginatedResponse<Storage>> {
    const project = await this.projectsRepository.findOneByUserId(projectId, userId);

    if (!project) {
      throw new RpcException(Messages.INVALID_PERMISSIONS);
    }

    if (page && limit) {
      return this.storagesRepository.findManyWithPagination({ projectId }, { page, limit });
    }

    return this.storagesRepository.findManyByProjectId(projectId);
  }

  async createOne({ userId, ...data }: CreateStorageDto): Promise<Storage> {

    const project = await this.projectsRepository.findOneByUserId(data.projectId, userId);

    if (!project) {
      throw new RpcException(Messages.PROJECT_NOT_FOUND);
    }

    const storageByPath = await this.storagesRepository.findOneByPath(data.path);

    if (storageByPath) {
      throw new RpcException(Messages.STORAGE_PATH_ERROR);
    }

    const storageByName = await this.storagesRepository.findOneByName(data.name);

    if (storageByName) {
      throw new RpcException(Messages.STORAGE_NAME_ERROR);
    }

    const storage = new Storage({
      ...data,
    });

    return this.storagesRepository.createOne(storage, storage.projectId);
  }
}
