import {
    Body, Controller, Get, Post, UnauthorizedException, UseGuards, Res, Query, Put,
    HttpCode, HttpStatus, Param, UseFilters,
} from '@nestjs/common';
import { ExchangeTokenDto, SetNewPasswordDto, ResetPasswordDto, LoginDto, LoginProjectDto } from 'astra-common';
import { Response } from 'express';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {UsersService} from '../users/users.service';
import {Messages} from '../../helpers/enums/messages.enum';
import {AuthService} from './auth.service';
import {AuthGuard} from '@nestjs/passport';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {IProject, IUser, JwtProjectAccountResponse, JwtProjectResponse, JwtUserResponse} from 'astra-common';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import {Project} from '../../helpers/decorators/project.decorator';

@Controller('auth')
@UseFilters(ApiExceptionFilter)
@ApiTags('Auth')
export class AuthController {

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login for generating access token' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<JwtUserResponse> {
    return this.authService.login(dto);
  }

  @Post('login/project')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login project for generating project access token' })
  async loginProject(@Body() dto: LoginProjectDto): Promise<JwtProjectResponse> {
    return this.authService.loginProject(dto);
  }

  @Post('login/projectAccount')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwtProject'))
  @ApiOperation({ summary: 'Login project account for generation access token' })
  async loginProjectAccount(
      @Project() project: IProject,
      @Body() dto: LoginDto,
  ): Promise<JwtProjectAccountResponse> {
      return await this.authService.loginProjectAccount(project.id, project.userId, dto);
  }

  @Post('token')
  @ApiOperation({ summary: 'Exchange refresh token for new access token' })
  async exchangeToken(@Body() payload: ExchangeTokenDto): Promise<JwtUserResponse> {
   return this.authService.exchangeToken(payload.refreshToken);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Login via google' })
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Callback for google authentication' })
  googleLoginCallback(@ReqUser() user: IUser | null, @Res() res: Response): void {
    if (user) {
      res.redirect(`/auth/google/success?googleId=${user.googleId}`);
    } else {
      res.redirect('/auth/google/fail');
    }
  }

  @Get('google/success')
  @ApiOperation({ summary: 'Google success authentication' })
  async googleSuccess(@Query('googleId') googleId: string): Promise<JwtUserResponse | void> {
    return this.authService.loginByGoogle(googleId);
  }

  @Get('google/fail')
  @ApiOperation({ summary: 'Google failed authentication' })
  async googleFail(): Promise<UnauthorizedException> {
    return new UnauthorizedException(Messages.FAILED_GOOGLE_AUTH);
  }

  @Put('changePassword')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new password' })
  async changePassword(@ReqUser() user: IUser, @Body() payload: any): Promise<void> {
    await this.usersService.changePassword(user.id, payload.oldPassword, payload.newPassword);

  }

  @Post('resetPassword')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Reset password' })
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    await this.usersService.resetPassword(dto.email);
  }

  @Get('resetPassword/hash/:hash')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify reset password hash' })
  async verifyResetPasswordHash(@Param('hash') hash: string): Promise<void> {
    await this.usersService.verifyResetPasswordHash(hash);
  }

  @Post('newPassword')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Set new password' })
  async setNewPassword(@Body() body: SetNewPasswordDto): Promise<void> {
    await this.usersService.setNewPassword(body);
  }
}
