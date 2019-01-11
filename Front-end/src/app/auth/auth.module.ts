import {NgModule} from '@angular/core';
import {LoginComponent} from './containers/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {SignupComponent} from './containers/signup/signup.component';
import * as fromServices from '../helpers/services';
import {ResetPasswordComponent} from './containers/reset-password/reset-password.component';
import {RouterModule} from '@angular/router';
import { NewPasswordComponent } from './containers/new-password/new-password.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CoreModule,
    RouterModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
  ],
  providers: [
    fromServices.AuthService
  ]
})
export class AuthModule {}
