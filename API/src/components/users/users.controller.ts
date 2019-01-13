import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { IUser } from '../../../../Common/src/entities';
import {CreateUserDto, FindUsersListDto} from '@astra/common/dto';
import {ExceptionFilter} from '../../helpers/filters/custom.filter';

@Controller('users')
@UseFilters(ExceptionFilter)
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get('')
  findMany(@Query() dto: FindUsersListDto): Promise<IUser[]> {
    return this.usersService.findMany(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number): Promise<IUser | undefined> {
    return this.usersService.findOne({ id });
  }

  @Post('')
  createOne(@Body() dto: CreateUserDto): Promise<IUser> {
    return this.usersService.createOne(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  updateOne(@Param('id') id: number, @Body() dto: any): Promise<IUser | undefined> {
    return this.usersService.updateOne({ id, ...dto });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async removeOne(@Param('id') id: number): Promise<void> {
    await this.usersService.removeOne({ id });
  }


}