import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import {
  AuthenticationFacade
} from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { Validators } from '@angular/forms';

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
    private authenticationFacade: AuthenticationFacade
  ) {}

  async login() {
    console.log('login');
    if (
      this.loginForm.controls['usernameControl'].value &&
      this.loginForm.controls['passwordControl'].value
    ) {
      this.authenticationFacade.postLogin(
        this.loginForm.controls['usernameControl'].value,
        CryptoJS.SHA256(
          this.loginForm.controls['passwordControl'].value
        ).toString(CryptoJS.enc.Base64)
      );
    }
  }
}
