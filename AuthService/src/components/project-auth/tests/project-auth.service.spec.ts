import { Test } from '@nestjs/testing';
import {ProjectAuthService} from '../project-auth.service';
import {JwtService} from '@nestjs/jwt';
import { mockHashService, mockJwtProjectPayload, mockJwtService, mockProject, mockProjectsClient } from './mocks';
import {HashService} from '@bit/alan18081.astra-storage.common.dist/services';
import {LoginProjectDto} from '@bit/alan18081.astra-storage.common.dist/dto';
import {CommunicationCodes, Messages} from '@bit/alan18081.astra-storage.common.dist';
import {RpcException} from '@nestjs/microservices';

describe('ProjectAuthService', () => {
    let projectAuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProjectAuthService,
                { provide: JwtService, useValue: mockJwtService },
                { provide: HashService, useValue: mockHashService },
            ],
        }).compile();

        projectAuthService = module.get<ProjectAuthService>(ProjectAuthService);
        projectAuthService.projectsClient = mockProjectsClient;
    });

    describe('login', () => {
        const payload: LoginProjectDto = {
            clientId: 'client id',
            clientSecret: 'client secret',
        };

        const accessToken = 'access token';

        beforeEach(() => {
            jest.spyOn(mockProjectsClient, 'send').mockImplementation(
                () => ({
                    async toPromise() {
                        return mockProject;
                    },
                })
            );
        });

        it('should call projectsClient.send', async () => {
           jest.spyOn(mockHashService, 'compareHash').mockImplementation(() => true);
           const spy = jest.spyOn(mockProjectsClient, 'send');

           await projectAuthService.login(payload);
           expect(spy).toBeCalledWith(
                { cmd: CommunicationCodes.GET_PROJECT_BY_CLIENT_INFO },
               { ...payload },
           );
        });

        it('should throw an exception if project is not found', async () => {
            jest.spyOn(mockProjectsClient, 'send').mockImplementation(
                () => ({
                    async toPromise() {},
                })
            );

            try {
                await projectAuthService.login(payload);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.PROJECT_NOT_FOUND)));
            }
        });

        it('should call jwtService.sign', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);
            const spy = jest.spyOn(mockJwtService, 'sign').mockImplementation(() => accessToken);
            await projectAuthService.login(payload);
            expect(spy).toBeCalledWith({ ...payload });
        });

        it('should return object with access token', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);
            jest.spyOn(mockJwtService, 'sign').mockImplementation( () => accessToken);
            expect(await projectAuthService.login(payload)).toEqual({ token: accessToken });
        });
    });

    describe('authByToken', () => {
        const token = 'some jwt token';

        beforeEach(() => {
            jest.spyOn(mockProjectsClient, 'send').mockImplementation(
              () => ({
                  async toPromise() {
                      return mockProject;
                  },
              }),
            );
        });

        it('should call jwtService.decode', async () => {
            const spy = jest.spyOn(mockJwtService, 'decode').mockImplementation(() => mockJwtProjectPayload);
            await projectAuthService.authByToken(token);
            expect(spy).toBeCalledWith(token);
        });

        it('should throw an exception if decoded result is null', async () => {
            jest.spyOn(mockJwtService, 'decode').mockImplementation(async () => null);
            try {
                await projectAuthService.authByToken(token);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.INVALID_TOKEN)));
            }
        });

        it('should throw an exception if decoded result is string', async () => {
            jest.spyOn(mockJwtService, 'decode').mockImplementation(() => 'some string');
            try {
                await projectAuthService.authByToken(token);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.INVALID_TOKEN)));
            }
        });

        it('should call projectsClient.send', async () => {
            jest.spyOn(mockJwtService, 'decode').mockImplementation(() => mockJwtProjectPayload);
            const spy = jest.spyOn(mockProjectsClient, 'send');
            await projectAuthService.authByToken(token);
            expect(spy).toBeCalledWith({ cmd: CommunicationCodes.GET_PROJECT_BY_CLIENT_INFO }, { ...mockJwtProjectPayload });
        });
    });
});
