import { FindManyOptions, Repository } from 'typeorm';
import { PaginationDto } from '../dto/common';
import { PaginatedResponse } from '../interfaces';
export declare class BaseRepository<T> extends Repository<T> {
    findById(id: number): Promise<T | undefined>;
    findManyWithPagination(query: FindManyOptions<T>, { page, limit }: Required<PaginationDto>): Promise<PaginatedResponse<T>>;
}
