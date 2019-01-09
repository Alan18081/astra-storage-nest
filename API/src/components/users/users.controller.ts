import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { IUser } from '../../../../Common/src/entities';
import { Observable } from 'rxjs';
import { CreateUserDto, FindUsersListDto } from '@astra/common';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get('')
  findMany(@Query() dto: FindUsersListDto): Observable<IUser[]> {
    return this.usersService.findMany(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number): Observable<IUser | undefined> {
    return this.usersService.findOne({ id });
  }

  @Post('')
  createOne(@Body() dto: CreateUserDto): Observable<IUser> {
    return this.usersService.createOne(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  updateOne(@Param('id') id: number, @Body() dto: any): Observable<IUser | undefined> {
    return this.usersService.updateOne({ id, ...dto });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  removeOne(@Param('id') id: number): Observable<void> {
    return this.usersService.removeOne({ id });
  }


}