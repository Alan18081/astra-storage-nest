import { Messages, PaginatedResponse } from 'astra-common';
import { Storage} from './storage.entity';
import {StoragesRepository} from './storages.repository';
import { Injectable } from '@nestjs/common';
import { CreateStorageDto, FindStoragesListDto } from 'astra-common';
import { RpcException } from '@nestjs/microservices';
import {InjectRepository} from '@nestjs/typeorm';
import {ProjectsService} from '../projects/projects.service';

@Injectable()
export class StoragesService {

  constructor(
    @InjectRepository(StoragesRepository)
    private readonly storagesRepository: StoragesRepository,
    private readonly projectsService: ProjectsService,
  ) {}

  async findManyByProject({ projectId, userId, page, limit }: FindStoragesListDto): Promise<Storage[] | PaginatedResponse<Storage>> {
    if (page && limit) {
      return this.storagesRepository.findManyWithPagination({ projectId }, { page, limit });
    }

    return this.storagesRepository.findManyByProjectId(projectId);
  }

  async findById(id: number): Promise<Storage | undefined> {
    return this.storagesRepository.findById(id);
  }

  async findOneByPath(path: string): Promise<Storage | undefined> {
    return this.storagesRepository.findOneByPath(path);
  }

  async createOne({ userId, ...payload}: CreateStorageDto): Promise<Storage> {

    const project = await this.projectsService.findById(payload.projectId);

    if (!project) {
      throw new RpcException(Messages.PROJECT_NOT_FOUND);
    }

    const storageByPath = await this.storagesRepository.findOneByPath(payload.path);

    if (storageByPath) {
      throw new RpcException(Messages.STORAGE_PATH_ERROR);
    }

    const storage = new Storage({
      ...payload,
    });


    return this.storagesRepository.createOne(storage, storage.projectId);
  }

  async updateOne(id: number, data: Partial<Storage>): Promise<Storage | undefined> {
    return this.storagesRepository.updateOneAndFind(id, data);
  }

  async removeById(id: number): Promise<void> {
    await this.storagesRepository.removeById(id);
  }
}
