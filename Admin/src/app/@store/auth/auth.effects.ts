import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AuthService} from '../../helpers/services/auth.service';
import * as authActions from './auth.actions';
import {catchError, switchMap} from 'rxjs/internal/operators';
import {of} from 'rxjs/index';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(authActions.GET_USER),
    switchMap(() => {
      return this.authService.getUser()
        .pipe(
          map(response => new authActions.AuthSuccess(response)),
          catchError(err => of(new authActions.GetUserFailed(err)))
        );
    })
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType(authActions.LOGIN),
    map((action: authActions.Login) => action.payload),
    switchMap(({email, password}) => {
      return this.authService.login(email, password)
        .pipe(
          map((response: {token: string, userInfo: any, expiresIn: string}) => {
            this.authService.setToken(response.token, response.expiresIn);
            return new authActions.AuthSuccess(response)
          }),
          catchError(err => of(new authActions.LoginFailed(err)))
        )
    })
  );

  @Effect()
  signup$ = this.actions$.pipe(
    ofType(authActions.SIGN_UP),
    map((action: authActions.SignUp) => action.payload),
    switchMap(({name, email, password, birthday}) => {
      return this.authService.signUp(name, email, password, birthday)
        .pipe(
          map((response: {token: string, userInfo: any, expiresIn: string}) => new authActions.AuthSuccess(response)),
          catchError(err => of(new authActions.SignUpFailed(err)))
        )
    })
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(authActions.LOGOUT),
    map(() => {
      this.authService.removeToken();
      return new authActions.LogoutSuccess();
    })
  );

  @Effect()
  resetPassword$ = this.actions$.pipe(
    ofType(authActions.RESET_PASSWORD),
    map((action: authActions.ResetPassword) => action.payload),
    switchMap((email: string) => {
      return this.authService.sendResetEmail(email)
        .pipe(
          map(response => new authActions.ResetPasswordSuccess(response)),
          catchError(error => of(new authActions.ResetPasswordFailed(error)))
        )
    })
  )

}
