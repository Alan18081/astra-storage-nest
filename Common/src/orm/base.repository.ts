import { FindManyOptions, Repository } from 'typeorm';
import { PaginationDto } from '../dto/common';
import { PaginatedResponse } from '../interfaces';

export class BaseRepository<T> extends Repository<T> {

    async findById(id: number): Promise<T | undefined> {
        return super.findOne(id);
    }

    async findManyWithPagination(query: FindManyOptions<T>, { page, limit }: Required<PaginationDto>): Promise<PaginatedResponse<T>> {
        const [data, count] = await super.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            where: query,
        });

        return {
            data,
            itemsPerPage: limit,
            page,
            totalCount: count,
        };
    }

}