export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    googleId?: string;
    roleId: number;
}
