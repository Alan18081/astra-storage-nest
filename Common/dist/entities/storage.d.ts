import { StorageType } from '../enums';
import { IProject } from './project';
export interface IStorage {
    id: number;
    name: string;
    description?: string;
    path: string;
    projectId: number;
    project: IProject;
    typeId: StorageType;
}
