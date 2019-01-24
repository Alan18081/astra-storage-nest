import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../@store';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(3)])
  });
  loading: Observable<boolean>;

  constructor(
    private store: Store<fromStore.IAppState>
  ) {}

  ngOnInit() {
    this.loading = this.store.select(fromStore.getAuthLoading);
  }

  submitForm() {
    const {email, password} = this.form.value;
    this.store.dispatch(new fromStore.Login({email, password}));
  }
}
