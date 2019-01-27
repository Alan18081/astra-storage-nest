import { Test } from '@nestjs/testing';
import {mockProject, mockProjectsService, mockUser, mockUsersService} from '../mocks';
import {UnauthorizedException} from '@nestjs/common';
import {Messages} from '@astra/common';
import {JwtProjectStrategy} from '../../strategies/jwt-project.strategy';
import {ProjectsService} from '../../../projects/projects.service';
import mock = jest.mock;

describe('JwtProjectStrategy', () => {
    let jwtProjectStrategy;

    beforeEach(async () => {
       const module = await Test.createTestingModule({
          providers: [
              JwtProjectStrategy,
              { provide: ProjectsService, useValue: mockProjectsService },
          ],
       }).compile();

       jwtProjectStrategy = module.get<JwtProjectStrategy>(JwtProjectStrategy);
   });

   describe('validate', () => {
       let req;
       const payload = {
           clientId: mockProject.clientId,
           clientSecret: mockProject.clientSecret,
       }

       beforeEach(() => {
          req = {
              project: undefined,
          };
       });

      it('should call projectsService.findOneByClientInfo', async () => {
        const spy = jest.spyOn(mockProjectsService, 'findOneByClientInfo').mockImplementation(async () => mockProject);
        await jwtProjectStrategy.validate(req, payload);
        expect(spy).toBeCalledWith(payload.clientId , payload.clientSecret);
      });

      it('should throw an exception if project is not found', async () => {
        jest.spyOn(mockProjectsService, 'findOneByClientInfo').mockImplementation(async () => undefined);
        try {
          await jwtProjectStrategy.validate(req, payload);
          expect(false);
        } catch (e) {
          expect(JSON.stringify(e)).toEqual(JSON.stringify(new UnauthorizedException(Messages.INVALID_TOKEN)));
        }
      });

       it('should set project property on request', async () => {
           jest.spyOn(mockProjectsService, 'findOneByClientInfo').mockImplementation(async () => mockProject);
           await jwtProjectStrategy.validate(req, payload);
           expect(req.project).toEqual(mockProject);
       });

       it('should return found project', async () => {
           jest.spyOn(mockProjectsService, 'findOneByClientInfo').mockImplementation(async () => mockProject);
           expect(await jwtProjectStrategy.validate(req, payload)).toEqual(mockProject);
       });

   });

});