import { DataActions } from '../enums';
export interface Action {
    type: DataActions;
    payload: any;
}
