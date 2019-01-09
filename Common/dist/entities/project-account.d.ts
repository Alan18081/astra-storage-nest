import { IEntityInfo } from './entity-info';
export interface IProjectAccount extends IEntityInfo {
    id: number;
    login: string;
    email: string;
    password: string;
    projectId: number;
}
