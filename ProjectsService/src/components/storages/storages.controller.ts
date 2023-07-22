import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import {
    CommunicationCodes,
    PaginatedResponse,
} from 'astra-common';
import { MessagePattern } from '@nestjs/microservices';
import { Storage } from './storage.entity';
import {
  CreateStorageDto,
  FindStorageByPathDto,
  FindStorageDto,
  FindStoragesListDto, RemoveStorageDto,
  UpdateStorageDto,
} from 'astra-common';
import { StoragesService } from './storages.service';
import {ExceptionFilter} from '../../helpers/filters/custom.filter';
import { ValidProjectOwnerGuard } from '../../helpers/guards/valid-project-owner.guard';

@Controller()
@UseFilters(ExceptionFilter)
export class StoragesController {

  constructor(
    private readonly storagesService: StoragesService,
  ) {}

  @MessagePattern({ cmd: CommunicationCodes.GET_STORAGES_LIST })
  @UseGuards(ValidProjectOwnerGuard)
  async findManyByProject(dto: FindStoragesListDto): Promise<Storage[] | PaginatedResponse<Storage>> {
    return this.storagesService.findManyByProject(dto);
  }

  @MessagePattern({ cmd: CommunicationCodes.GET_STORAGE })
  async findOneById(dto: FindStorageDto): Promise<Storage | undefined> {
    return this.storagesService.findById(dto.id);
  }

  @MessagePattern({ cmd: CommunicationCodes.GET_STORAGE_BY_PATH })
  async findOneByPath(dto: FindStorageByPathDto): Promise<Storage | undefined> {
      return this.storagesService.findOneByPath(dto.path);
  }

  @MessagePattern({ cmd: CommunicationCodes.CREATE_STORAGE })
  async createOne(dto: CreateStorageDto): Promise<Storage> {
    return await this.storagesService.createOne(dto);
  }

  @MessagePattern({ cmd: CommunicationCodes.UPDATE_STORAGE })
  async updateOne(body: UpdateStorageDto): Promise<Storage | undefined> {
    return await this.storagesService.updateOne(body.id, body);

  }

  @MessagePattern({ cmd: CommunicationCodes.REMOVE_STORAGE })
  async removeOne(dto: RemoveStorageDto): Promise<void> {
    await this.storagesService.removeById(dto.id);
  }

}
