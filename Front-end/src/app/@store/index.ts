import * as fromAuth from './auth';
import {ActionReducerMap} from '@ngrx/store';

export interface IAppState {
  auth: fromAuth.IAuthState
}

export const reducers: ActionReducerMap<IAppState> = {
  auth: fromAuth.reducer
}

export const effects: any = [fromAuth.AuthEffects];

export * from './auth';
