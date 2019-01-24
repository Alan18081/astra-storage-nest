import * as actions from './auth.actions';

export interface IAuthState {
  token: string;
  isLoggedIn: boolean;
  loading: boolean;
  loginError: string;
  signUpError: string;
  userInfo: {}
}

export const initialState: IAuthState = {
  token: '',
  isLoggedIn: false,
  loading: false,
  loginError: '',
  signUpError: '',
  userInfo: null
};

export function reducer(state = initialState, {type, payload}: actions.AuthAction) {
  switch (type) {

    case actions.SIGN_UP:
    case actions.LOGIN:
      return {
        ...state,
        loading: true
      };

    case actions.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        userInfo: payload.userInfo,
        token: payload.token
      };

    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        token: ''
      };

    case actions.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        loginError: payload
      };

    case actions.SIGN_UP_FAILED:
      return {
        ...state,
        loading: false,
        signUpError: payload
      };

    default:
      return state;
  }
}

export const getLoading = (state: IAuthState) => state.loading;
export const getLoggedStatus = (state: IAuthState) => state.isLoggedIn;
export const getUserInfo = (state: IAuthState) => state.userInfo;
