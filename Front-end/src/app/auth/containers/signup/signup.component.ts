import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {matchPasswords} from './passwords-match.validator';
import {Observable} from 'rxjs/index';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../@store';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    'name': new FormControl(null, Validators.required),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'birthday': new FormControl(null, Validators.required),
    'password': new FormControl(null, [Validators.required, Validators.minLength(3)]),
    'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(3)])
  }, matchPasswords);
  loading: Observable<boolean>;

  constructor(
    private store: Store<fromStore.IAppState>
  ) {}

  ngOnInit() {
    this.loading = this.store.select(fromStore.getAuthLoading);
  }

  submitForm() {
    const {email, password} = this.form.value;
    console.log(this.form.value);
  }
}
