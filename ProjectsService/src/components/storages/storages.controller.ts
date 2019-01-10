import { Controller } from '@nestjs/common';
import {
    CommunicationCodes,
    Messages,
    PaginatedResponse,
} from '@astra/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoragesRepository } from './storages.repository';
import { MessagePattern } from '@nestjs/microservices';
import { Storage } from './storage.entity';
import {
  CreateStorageDto,
  FindStorageByPathDto,
  FindStorageDto,
  FindStoragesListDto, RemoveStorageDto,
  UpdateStorageDto,
} from '@astra/common/dto';
import { StoragesService } from './storages.service';

@Controller()
export class StoragesController {

  constructor(
    @InjectRepository(StoragesRepository)
    private readonly storagesRepository: StoragesRepository,
    private readonly storagesService: StoragesService,
  ) {}

  @MessagePattern({ cmd: CommunicationCodes.GET_STORAGES_LIST })
  async findManyByProject(dto: FindStoragesListDto): Promise<Storage[] | PaginatedResponse<Storage>> {
    return this.storagesService.findManyByProject(dto);
  }

  @MessagePattern({ cmd: CommunicationCodes.GET_STORAGE })
  async findOneById(dto: FindStorageDto): Promise<Storage | undefined> {
    return this.storagesRepository.findById(dto.id);
  }

  @MessagePattern({ cmd: CommunicationCodes.GET_STORAGE_BY_PATH })
  async findOneByPath(dto: FindStorageByPathDto): Promise<Storage | undefined> {
      return this.storagesRepository.findOneByPath(dto.path);
  }

  @MessagePattern({ cmd: CommunicationCodes.CREATE_STORAGE })
  async createOne(dto: CreateStorageDto): Promise<Storage> {
    return await this.storagesService.createOne(dto);
  }

  @MessagePattern({ cmd: CommunicationCodes.UPDATE_STORAGE })
  async updateOneData(body: UpdateStorageDto): Promise<Storage | undefined> {
    return await this.storagesRepository.updateOne(body.id, body);

  }

  @MessagePattern({ cmd: CommunicationCodes.REMOVE_STORAGE })
  async removeOne(dto: RemoveStorageDto): Promise<void> {
    await this.storagesRepository.removeById(dto.id);
  }

}