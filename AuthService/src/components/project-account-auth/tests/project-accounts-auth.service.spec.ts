import { Test } from '@nestjs/testing';
import {ProjectAccountAuthService} from '../project-account-auth.service';
import {JwtService} from '@nestjs/jwt';
import {mockHashService, mockJwtService, mockProjectAccount, mockProjectsClient} from './mocks';
import {HashService} from '@astra/common/services';
import {LoginProjectAccountDto} from '@astra/common/dto';
import {CommunicationCodes, Messages} from '@astra/common';
import {RpcException} from '@nestjs/microservices';

describe('ProjectAccountsAuthService', () => {
    let projectAccountAuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProjectAccountAuthService,
                { provide: JwtService, useValue: mockJwtService },
                { provide: HashService, useValue: mockHashService },
            ],
        }).compile();

        projectAccountAuthService = module.get<ProjectAccountAuthService>(ProjectAccountAuthService);
        projectAccountAuthService.projectsClient = mockProjectsClient;
    });

    describe('login', () => {
        const payload: LoginProjectAccountDto = {
            projectId: 5,
            email: 'alan@gmail.com',
            userId: 20,
            password: '12345',
        };

        const accessToken = 'access token';

        beforeEach(() => {
            jest.spyOn(mockProjectsClient, 'send').mockImplementation(
                () => ({
                    async toPromise() {
                        return mockProjectAccount;
                    },
                })
            );
        });

        it('should call projectsClient.send', async () => {
           jest.spyOn(mockHashService, 'compareHash').mockImplementation(() => true);
           const spy = jest.spyOn(mockProjectsClient, 'send');

           await projectAccountAuthService.login(payload);
           expect(spy).toBeCalledWith({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNT_BY_EMAIL }, { email: payload.email, projectId: payload.projectId, userId: payload.userId });
        });

        it('should throw an exception if project account is not found', async () => {
            jest.spyOn(mockProjectsClient, 'send').mockImplementation(
                () => ({
                    async toPromise() {},
                })
            );

            try {
                await projectAccountAuthService.login(payload);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.USER_NOT_FOUND)));
            }
        });

        it('should call hashService.compareHash', async () => {
            const spy = jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);
            await projectAccountAuthService.login(payload);
            expect(spy).toBeCalledWith(payload.password, mockProjectAccount.password);
        });

        it('should throw an exception if provided password doesn\'t match with account password', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => false);
            try {
                await projectAccountAuthService.login(payload);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.WRONG_PASSWORD)));
            }
        });

        it('should call jwtService.sign', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);
            const spy = jest.spyOn(mockJwtService, 'sign').mockImplementation(() => accessToken);
            await projectAccountAuthService.login(payload);
            expect(spy).toBeCalledWith({
                email: mockProjectAccount.email,
                id: mockProjectAccount.id,
                projectId: mockProjectAccount.projectId,
            });
        });

        it('should return object with access token', async () => {
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);
            jest.spyOn(mockJwtService, 'sign').mockImplementation( () => accessToken);
            expect(await projectAccountAuthService.login(payload)).toEqual({ accessToken });
        });
    });
});
