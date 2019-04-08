import { Test } from '@nestjs/testing';
import {UserAuthService} from '../user-auth.service';
import {JwtService} from '@nestjs/jwt';
import {
    mockHashService,
    mockJwtService,
    mockUsersClient,
    mockUser,
    mockRefreshTokensService,
} from './mocks';
import {HashService} from '@bit/alan18081.astra-storage.common.dist/services';
import {LoginByGoogleDto, LoginDto} from '@bit/alan18081.astra-storage.common.dist/dto';
import {CommunicationCodes, JWT_EXPIRES, Messages} from '@bit/alan18081.astra-storage.common.dist';
import {RpcException} from '@nestjs/microservices';
import {RefreshTokensService} from '../../refresh-tokens/refresh-tokens.service';
import {mockRefreshToken} from '../../refresh-tokens/tests/mocks';

describe('UserAuthService', () => {
    let userAuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserAuthService,
                { provide: JwtService, useValue: mockJwtService },
                { provide: HashService, useValue: mockHashService },
                { provide: RefreshTokensService, useValue: mockRefreshTokensService },
            ],
        }).compile();

        userAuthService = module.get<UserAuthService>(UserAuthService);
        userAuthService.usersClient = mockUsersClient;
    });

    describe('login', () => {
        const payload: LoginDto = {
            email: 'alan@gmail.com',
            password: '12345',
        };

        const accessToken = 'access token';

        beforeEach(() => {
            jest.spyOn(mockUsersClient, 'send').mockImplementation(
                () => ({
                    async toPromise() {
                        return mockUser;
                    },
                })
            );
            jest.spyOn(mockRefreshTokensService, 'createOne').mockImplementation( () => mockRefreshToken);
        });

        it('should call usersClient.send', async () => {
           jest.spyOn(mockHashService, 'compareHash').mockImplementation(() => true);
           const spy = jest.spyOn(mockUsersClient, 'send');

           await userAuthService.login(payload);
           expect(spy).toBeCalledWith({ cmd: CommunicationCodes.GET_USER_BY_EMAIL }, { email: payload.email });
        });

        it('should throw an exception if user is not found', async () => {
            jest.spyOn(mockUsersClient, 'send').mockImplementation(
                () => ({
                    async toPromise() {},
                })
            );

            try {
                await userAuthService.login(payload);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.USER_NOT_FOUND)));
            }
        });

        it('should throw an exception if user does not have password', async () => {
            jest.spyOn(mockUsersClient, 'send').mockImplementation(
                () => ({
                    async toPromise() {
                        const { password, ...data } = mockUser;
                        return data;
                    },
                })
            );

            try {
                await userAuthService.login(payload);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.USER_DOESNT_HAVE_PASSWORD)));
            }
        });

        it('should call hashService.compareHash', async () => {
            const spy = jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);
            await userAuthService.login(payload);
            expect(spy).toBeCalledWith(payload.password, mockUser.password);
        });

        it('should throw an exception if provided password doesn\'t match with account password', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => false);
            try {
                await userAuthService.login(payload);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.WRONG_PASSWORD)));
            }
        });

        it('should call userAuthService.generateTokens', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);
            const spy = jest.spyOn(userAuthService, 'generateTokens').mockImplementation(async () => ({
                accessToken,
                refreshToken: mockRefreshToken.token,
                expiresIn: JWT_EXPIRES,
            }));
            await userAuthService.login(payload);
            expect(spy).toBeCalledWith(mockUser);
        });

        it('should return object with access token', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);
            jest.spyOn(mockJwtService, 'sign').mockImplementation( () => accessToken);
            expect(await userAuthService.login(payload)).toEqual({
                accessToken,
                expiresIn: JWT_EXPIRES,
                refreshToken: mockRefreshToken.token,
            });
        });
    });

    describe('loginByGoogle', () => {
        const payload: LoginByGoogleDto = {
            googleId: '12343545',
        };

        const accessToken = 'access token';

        beforeEach(() => {
            jest.spyOn(mockUsersClient, 'send').mockImplementation(
                () => ({
                    async toPromise() {
                        return mockUser;
                    },
                })
            );
            jest.spyOn(mockRefreshTokensService, 'createOne').mockImplementation( () => mockRefreshToken);
        });

        it('should call usersClient.send', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(() => true);
            const spy = jest.spyOn(mockUsersClient, 'send');

            await userAuthService.loginByGoogle(payload);
            expect(spy).toBeCalledWith({ cmd: CommunicationCodes.GET_USER_BY_GOOGLE_ID }, { googleId: payload.googleId });
        });

        it('should throw an exception if user is not found', async () => {
            jest.spyOn(mockUsersClient, 'send').mockImplementation(
                () => ({
                    async toPromise() {},
                })
            );

            try {
                await userAuthService.loginByGoogle(payload);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.USER_NOT_FOUND)));
            }
        });

        it('should call userAuthService.generateTokens', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);
            const spy = jest.spyOn(userAuthService, 'generateTokens').mockImplementation(async () => ({
                accessToken,
                refreshToken: mockRefreshToken.token,
                expiresIn: JWT_EXPIRES,
            }));
            await userAuthService.loginByGoogle(payload);
            expect(spy).toBeCalledWith(mockUser);
        });

        it('should return object with access token', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);
            jest.spyOn(mockJwtService, 'sign').mockImplementation( () => accessToken);
            expect(await userAuthService.loginByGoogle(payload)).toEqual({
                accessToken,
                expiresIn: JWT_EXPIRES,
                refreshToken: mockRefreshToken.token,
            });
        });
    });

    describe('exchangeToken', () => {
        const token = 'Some refresh token';
        const accessToken = 'access token';

        beforeEach(() => {
            jest.spyOn(mockRefreshTokensService, 'findOneByToken').mockImplementation(async () => mockRefreshToken);
            jest.spyOn(mockUsersClient, 'send').mockImplementation(
                () => ({
                    async toPromise() {
                        return mockUser;
                    },
                }),
            );
        });

        it('should call refreshTokensService.findOneByToken', async () => {
            const spy = jest.spyOn(mockRefreshTokensService, 'findOneByToken').mockImplementation(async () => mockRefreshToken);
            await userAuthService.exchangeToken(token);
            expect(spy).toBeCalledWith(token);
        });

        it('should throw an exception if refresh token is not found', async () => {
            jest.spyOn(mockRefreshTokensService, 'findOneByToken').mockImplementation(async () => undefined);
            try {
                await userAuthService.exchangeToken(token);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.INVALID_REFRESH_TOKEN)));
            }
        });

        it('should call usersClient.send', async () => {
            const spy = jest.spyOn(mockUsersClient, 'send');
            await userAuthService.exchangeToken(token);
            expect(spy).toBeCalledWith({ cmd: CommunicationCodes.GET_USER }, { id: mockRefreshToken.userId });
        });

        it('should throw an exception if user is not found', async () => {
            jest.spyOn(mockUsersClient, 'send').mockImplementation(
                () => ({
                    async toPromise() {},
                })
            );

            try {
                await userAuthService.exchangeToken(token);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.USER_NOT_FOUND)));
            }
        });

        it('should call jwtService.sign', async () => {
            const spy = jest.spyOn(mockJwtService, 'sign').mockImplementation(() => accessToken);
            await userAuthService.exchangeToken(token);
            expect(spy).toBeCalledWith({
                id: mockUser.id,
                email: mockUser.email,
            });
        });

        it('should return refresh token, access token and expiresIn', async () => {
            jest.spyOn(mockJwtService, 'sign').mockImplementation(() => accessToken);
            expect(await userAuthService.exchangeToken(token)).toEqual({
                accessToken,
                refreshToken: token,
                expiresIn: JWT_EXPIRES,
            });
        });
    });

    describe('generateTokens', () => {
        const accessToken = 'access token';

        it('should throw an exception if provided password doesn\'t match with account password', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => false);
            try {
                await userAuthService.generateTokens(mockUser);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.WRONG_PASSWORD)));
            }
        });

        it('should call jwtService.sign', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);
            const spy = jest.spyOn(mockJwtService, 'sign').mockImplementation(() => accessToken);
            await userAuthService.login(mockUser);
            expect(spy).toBeCalledWith({
                id: mockUser.id,
                email: mockUser.email,
            });
        });

        it('should call refreshTokensService.createOne', async () => {
            jest.spyOn(mockJwtService, 'sign').mockImplementation(() => accessToken);
            const spy = jest.spyOn(mockRefreshTokensService, 'createOne').mockImplementation(async () => mockRefreshToken);
            await userAuthService.login(mockUser);
            expect(spy).toBeCalledWith({
                accessToken,
                userId: mockUser.id,
            });
        });

        it('should return object with access token', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);
            jest.spyOn(mockJwtService, 'sign').mockImplementation( () => accessToken);
            expect(await userAuthService.login(mockUser)).toEqual({
                accessToken,
                expiresIn: JWT_EXPIRES,
                refreshToken: mockRefreshToken.token,
            });
        });
    });
});
