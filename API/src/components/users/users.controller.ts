import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode, HttpStatus, NotFoundException, OnModuleInit,
    Param, ParseIntPipe,
    Post,
    Put,
    Query,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
// import { UsersServiceOld } from './users.service.old';
import {CreateUserDto, FindUsersListDto} from '@astra/common/dto';
import {ApiExceptionFilter} from '../../helpers/filters/api.filter';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import { AdminGuard } from '../../helpers/guards/admin.guard';
import { Messages, IUser } from '@astra/common';
import {Client, ClientGrpc, Transport} from '@nestjs/microservices';
import {join} from 'path';
import {UsersService} from './users.service';
import {Observable} from 'rxjs/internal/Observable';

@Controller('users')
@UseFilters(ApiExceptionFilter)
@ApiUseTags('Users')
export class UsersController implements OnModuleInit {

    @Client({
        transport: Transport.GRPC,
        options: {
            url: 'localhost:5000',
            package: 'users',
            protoPath: join(__dirname, '../../proto/users.proto'),
        },
    })
    private readonly client: ClientGrpc;

    private usersService: UsersService;

  constructor() {
    console.log(join(__dirname, '../../proto/users.proto'));
    console.log(this.client);
  }

  onModuleInit(): any {
      this.usersService = this.client.getService('UsersService');
  }
  //
  // @Get('')
  // @UseGuards(AuthGuard('jwt'), AdminGuard)
  // @ApiOperation({ title: 'Find list of users' })
  // findMany(@Query() dto: FindUsersListDto): Promise<IUser[]> {
  //   return this.usersService.findMany(dto);
  // }

  // @Get('profile')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOperation({ title: 'Find user by token' })
  // findProfile(@ReqUser() user: IUser): Promise<IUser | undefined> {
  //   return this.usersService.findOne({ id: user.id });
  // }
  //
  // @Get(':id')
  // @UseGuards(AuthGuard('jwt'), AdminGuard)
  // @ApiOperation({ title: 'Find user by id' })
  // async findOne(@Param('id') id: number): Promise<IUser | undefined> {
  //   const user = await this.usersService.findOne({ id });
  //   if (!user) {
  //     throw new NotFoundException(Messages.USER_NOT_FOUND);
  //   }
  //
  //   return user;
  // }

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Create new user' })
  createOne(@Body() dto: CreateUserDto): Observable<IUser> {
    return this.usersService.createOne(dto);
  }

  // @Put(':id')
  // @UseGuards(AuthGuard('jwt'), AdminGuard)
  // @ApiOperation({ title: 'Update user by id' })
  // updateOne(@Param('id') id: number, @Body() dto: any): Promise<IUser | undefined> {
  //   return this.usersService.updateOne({ id, ...dto });
  // }
  //
  // @Delete(':id')
  // @UseGuards(AuthGuard('jwt'), AdminGuard)
  // @ApiOperation({ title: 'Delete user by id' })
  // async removeOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
  //   await this.usersService.removeOne({ id });
  // }

}
