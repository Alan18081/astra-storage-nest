import { Project } from './components/project/project';
import { apiRequest } from './helpers/api-request';

export const initProject = async (clientId: string, clientSecret: string): Promise<Project> => {
    const res = await apiRequest({
      url: `/auth/login/project`,
      method: 'POST',
      data: {
        clientId,
        clientSecret,
      },
    });
    const { token } = res.data;
    return new Project(token);
};
