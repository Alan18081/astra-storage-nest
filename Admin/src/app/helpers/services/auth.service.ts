import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';

@Injectable()
export class AuthService {

  getUser(): Observable<any> {
    return of({id: 1, name: 'Alan'});
  }

  login(email: string, password: string): Observable<any> {
    return of({
      token: 'gdgfgf',
      userInfo: {
        id: 1,
        name: 'Alan'
      }
    });
  }

  signUp(name: string, email: string, password: string, birthday: string): Observable<any> {
    return of({
      token: 'gdgfgf',
      userInfo: {
        id: 1,
        name: 'Alan'
      }
    });
  }

  setToken(token: string, expiresIn: string) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authTokenExpiresIn', expiresIn);
  }

  getToken() {
    return {
      token: localStorage.getItem('authToken'),
      expiresIn: localStorage.getItem('authTokenExpiresIn')
    };
  }

  removeToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authToken');
  }

  sendResetEmail(email): Observable<any> {
    return of(email);
  }
}
