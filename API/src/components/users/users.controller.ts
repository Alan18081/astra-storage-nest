import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode, HttpStatus, NotFoundException,
  Param, ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import {CreateUserDto, FindUsersListDto} from 'astra-common';
import {ApiExceptionFilter} from '../../helpers/filters/api.filter';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import { AdminGuard } from '../../helpers/guards/admin.guard';
import { Messages, IUser } from 'astra-common';

@Controller('users')
@UseFilters(ApiExceptionFilter)
@ApiTags('Users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiOperation({ summary: 'Find list of users' })
  findMany(@Query() dto: FindUsersListDto): Promise<IUser[]> {
    return this.usersService.findMany(dto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Find user by token' })
  findProfile(@ReqUser() user: IUser): Promise<IUser | undefined> {
    return this.usersService.findOne({ id: user.id });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiOperation({ summary: 'Find user by id' })
  async findOne(@Param('id') id: number): Promise<IUser | undefined> {
    const user = await this.usersService.findOne({ id });
    if (!user) {
      throw new NotFoundException(Messages.USER_NOT_FOUND);
    }

    return user;
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create new user' })
  createOne(@Body() dto: CreateUserDto): Promise<IUser> {
    return this.usersService.createOne(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiOperation({ summary: 'Update user by id' })
  updateOne(@Param('id') id: number, @Body() dto: any): Promise<IUser | undefined> {
    return this.usersService.updateOne({ id, ...dto });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiOperation({ summary: 'Delete user by id' })
  async removeOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    await this.usersService.removeOne({ id });
  }

}
