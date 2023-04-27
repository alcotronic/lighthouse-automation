import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import {
  AuthenticationState,
  postLogin,
} from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lha-frontend-feature-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    usernameControl: ['', Validators.required],
    passwordControl: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private storeAuthentication: Store<AuthenticationState>
  ) {}

  async login() {
    console.log('login');
    if (
      this.loginForm.controls['usernameControl'].value &&
      this.loginForm.controls['passwordControl'].value
    ) {
      this.storeAuthentication.dispatch(
        postLogin({
          loginDto: {
            username: this.loginForm.controls['usernameControl'].value,
            password: CryptoJS.SHA256(
              this.loginForm.controls['passwordControl'].value
            ).toString(CryptoJS.enc.Base64),
          },
        })
      );
    }
  }
}
