import {
  Body, Controller, Get, Post, UnauthorizedException, UseGuards, Res, Query, Put,
  BadRequestException, HttpCode, HttpStatus, NotFoundException, Param,
} from '@nestjs/common';
import { ChangePasswordDto, ExchangeTokenDto, SetNewPasswordDto, ResetPasswordDto, LoginDto } from '@astra/common';
import { Response } from 'express';
import {ApiBearerAuth, ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {UsersService} from '../users/users.service';
import {Messages} from '../../helpers/enums/messages.enum';
import {JwtResponse} from './interfaces/jwt-response';
import {AuthService} from './auth.service';
import {AuthGuard} from '@nestjs/passport';
import {ReqUser} from '../../helpers/decorators/user.decorator';

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
    return await this.authService.login(dto);
  }

  // @Post('token')
  // @ApiOperation({ title: 'Exchange refresh token for new access token' })
  // async exchangeToken(@Body() payload: ExchangeTokenDto): Promise<JwtResponse> {
  //  return await this.authService.exchangeToken(payload.refreshToken);
  // }
  //
  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // @ApiOperation({ title: 'Login via google' })
  // googleLogin() {}
  //
  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // @ApiOperation({ title: 'Callback for google authentication' })
  // googleLoginCallback(@ReqUser() user-auth: User | null, @Res() res: Response): void {
  //   if (user-auth) {
  //     res.redirect(`/user-auth/google/success?userId=${user-auth.id}`);
  //   } else {
  //     res.redirect('/user-auth/google/fail');
  //   }
  // }
  //
  // @Get('google/success')
  // @ApiOperation({ title: 'Google success authentication' })
  // async googleSuccess(@Query('userId') userId: number): Promise<JwtResponse | void> {
  //   const user-auth = await this.usersService.findOne({ id: userId });
  //   if (user-auth) {
  //     return await this.authService.login(user-auth);
  //   }
  // }
  //
  // @Get('google/fail')
  // @ApiOperation({ title: 'Google failed authentication' })
  // async googleFail(): Promise<UnauthorizedException> {
  //   return new UnauthorizedException(Messages.FAILED_GOOGLE_AUTH);
  // }
  //
  // @Put('changePassword')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // @ApiOperation({ title: 'Create new password' })
  // async changePassword(@ReqUser() user-auth: User, @Body() payload: ChangePasswordDto): Promise<void> {
  //
  //   if(!user-auth.password) {
  //     throw new BadRequestException(Messages.USER_DOESNT_HAVE_PASSWORD);
  //   }
  //
  //   const isValid = await this.hashService.compareHash(payload.oldPassword, user-auth.password);
  //
  //   if (!isValid) {
  //     throw new BadRequestException(Messages.INVALID_PASSWORD);
  //   }
  //
  //   const newPassword = await this.hashService.generateHash(payload.newPassword);
  //
  //   await this.usersService.updateOne(user-auth.id, { password: newPassword });
  // }
  //
  // @Get('verifyEmail')
  // @HttpCode(HttpStatus.ACCEPTED)
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // @ApiOperation({ title: 'Verify your email' })
  // async verifyEmail(@ReqUser() user-auth: User): Promise<void> {
  //   await this.authService.verifyEmail(user-auth);
  // }
  //
  // @Get('verifyEmail/hash/:hash')
  // @HttpCode(HttpStatus.ACCEPTED)
  // @ApiOperation({ title: 'Route to which you will be redirected when click btn in your email' })
  // async verifyEmailHash(@Param('hash') hash: string): Promise<void> {
  //   console.log(hash);
  // }
  //
  // @Post('resetPassword')
  // @HttpCode(HttpStatus.ACCEPTED)
  // @ApiOperation({ title: 'Reset password' })
  // async resetPassword(@Body() body: ResetPasswordDto): Promise<void> {
  //   const user-auth = await this.usersService.findOneByEmail(body.email);
  //
  //   if (!user-auth) {
  //     throw new NotFoundException(Messages.USER_NOT_FOUND);
  //   }
  //
  //   await this.authService.resetPassword(user-auth);
  //
  // }
  //
  // @Post('newPassword')
  // @HttpCode(HttpStatus.ACCEPTED)
  // @ApiOperation({ title: 'Set new password' })
  // async setNewPassword(@Body() body: SetNewPasswordDto): Promise<void> {
  //   await this.authService.setNewPassword(body);
  // }
}