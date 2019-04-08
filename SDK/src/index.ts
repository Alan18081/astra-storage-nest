import { Project } from './components/project/project';
import { apiRequest } from './helpers/api-request';
import * as io from 'socket.io-client';
import { WS_API_URL } from './config';
import { WsCodes } from '@astra/common/enums';
import { promisify } from 'util';
import { handle } from './helpers/handle';


export const initProject = async (clientId: string, clientSecret: string): Promise<Project> => {
    try {
      const res = await apiRequest({
        url: `/auth/login/project`,
        method: 'POST',
        data: {
          clientId,
          clientSecret,
        },
      });
      const { token } = res.data;
      const socket = io(WS_API_URL, {
        query: {
          token,
        },
      });
      await handle(socket, WsCodes.CONNECTED);
      return new Project(token, socket);
    } catch (e) {
      throw new Error(e.response.data.message.message);
    }
};
