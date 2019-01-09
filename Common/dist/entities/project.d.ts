export interface IProject {
    id: number;
    name: string;
    description?: string;
    clientId: string;
    clientSecret: string;
    authProjectId?: number;
    storagesCount: number;
    userId: number;
    createdAt: Date;
}
