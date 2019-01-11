import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const getAuthState = createFeatureSelector<fromAuth.IAuthState>('auth');

export const getAuthLoading = createSelector(
  getAuthState,
  fromAuth.getLoading
);

export const getAuthLoggedStatus = createSelector(
  getAuthState,
  fromAuth.getLoggedStatus
);
