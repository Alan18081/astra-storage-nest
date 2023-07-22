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
//# sourceMappingURL=storage.d.ts.map