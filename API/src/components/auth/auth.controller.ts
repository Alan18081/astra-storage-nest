import {
    Body, Controller, Get, Post, UnauthorizedException, UseGuards, Res, Query, Put,
    HttpCode, HttpStatus, Param,
} from '@nestjs/common';
import { ChangePasswordDto, ExchangeTokenDto, SetNewPasswordDto, ResetPasswordDto, LoginDto } from '@astra/common/dto';
import { Response } from 'express';
import {ApiBearerAuth, ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {UsersService} from '../users/users.service';
import {Messages} from '../../helpers/enums/messages.enum';
import {AuthService} from './auth.service';
import {AuthGuard} from '@nestjs/passport';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {IUser, JwtResponse} from '@astra/common';

@Controller('auth')
@ApiUseTags('Auth')
export class AuthController {

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({ title: 'Login for generating access token' })
  async login(@Body() dto: LoginDto): Promise<JwtResponse> {
    return this.authService.login(dto);
  }

  @Post('token')
  @ApiOperation({ title: 'Exchange refresh token for new access token' })
  async exchangeToken(@Body() payload: ExchangeTokenDto): Promise<JwtResponse> {
   return this.authService.exchangeToken(payload.refreshToken);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ title: 'Login via google' })
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ title: 'Callback for google authentication' })
  googleLoginCallback(@ReqUser() user: IUser | null, @Res() res: Response): void {
    if (user) {
      res.redirect(`/user-auth/google/success?userId=${user.id}`);
    } else {
      res.redirect('/user-auth/google/fail');
    }
  }

  @Get('google/success')
  @ApiOperation({ title: 'Google success authentication' })
  async googleSuccess(@Query('userId') userId: number): Promise<JwtResponse | void> {
    const user = await this.usersService.findOne({ id: userId });
    if (user) {
      return await this.authService.login(user);
    }
  }

  @Get('google/fail')
  @ApiOperation({ title: 'Google failed authentication' })
  async googleFail(): Promise<UnauthorizedException> {
    return new UnauthorizedException(Messages.FAILED_GOOGLE_AUTH);
  }

  @Put('changePassword')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiBearerAuth()
  @ApiOperation({ title: 'Create new password' })
  async changePassword(@ReqUser() user: IUser, @Body() payload: any): Promise<void> {
    await this.authService.changePassword(user.id, payload.oldPassword, payload.newPassword);

  }
  //
  // @Get('verifyEmail')
  // @HttpCode(HttpStatus.ACCEPTED)
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // @ApiOperation({ title: 'Verify your email' })
  // async verifyEmail(@ReqUser() user: IUser): Promise<void> {
  //   await this.authService.verifyEmail(user);
  // }
  //
  // @Get('verifyEmail/hash/:hash')
  // @HttpCode(HttpStatus.ACCEPTED)
  // @ApiOperation({ title: 'Route to which you will be redirected when click btn in your email' })
  // async verifyEmailHash(@Param('hash') hash: string): Promise<void> {
  //   console.log(hash);
  // }

  @Post('resetPassword')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ title: 'Reset password' })
  async resetPassword(@Body() body: ResetPasswordDto): Promise<void> {
    await this.authService.resetPassword(body.email);
  }

  @Get('resetPassword/hash/:hash')
  @ApiOperation({ title: 'Verify reset password hash' })
  async verifyResetPasswordHash(@Param('hash') hash: string): Promise<void> {
    await this.authService.verifyResetPasswordHash(hash);
  }

  @Post('newPassword')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ title: 'Set new password' })
  async setNewPassword(@Body() body: SetNewPasswordDto): Promise<void> {
    await this.authService.setNewPassword(body);
  }
}