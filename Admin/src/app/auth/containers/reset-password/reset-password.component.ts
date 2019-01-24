import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as fromStore from '../../../@store';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email])
  });
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.IAppState>
  ) {}

  ngOnInit() {
    this.loading$ = this.store.select(fromStore.getAuthLoading);
  }

  submitForm() {
    const {email} = this.form.value;
    this.store.dispatch(new fromStore.ResetPassword(email));
  }

}
