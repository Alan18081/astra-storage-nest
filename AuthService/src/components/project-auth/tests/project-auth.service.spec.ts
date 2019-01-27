import { Test } from '@nestjs/testing';
import {ProjectAuthService} from '../project-auth.service';
import {JwtService} from '@nestjs/jwt';
import {mockHashService, mockJwtService, mockProject, mockProjectsClient} from './mocks';
import {HashService} from '@astra/common/services';
import {LoginProjectDto} from '@astra/common/dto';
import {CommunicationCodes, Messages} from '@astra/common';
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
});
