import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from '@lighthouse-automation/lha-frontend/data-access/authentication';
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
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  async login() {
    console.log('login');
    if (
      this.loginForm.controls['usernameControl'].value &&
      this.loginForm.controls['passwordControl'].value
    ) {
      this.authenticationService
        .login(
          this.loginForm.controls['usernameControl'].value,
          CryptoJS.SHA256(
            this.loginForm.controls['passwordControl'].value
          ).toString(CryptoJS.enc.Base64)
        )
        .subscribe((result: any) => {
          if (result && result.access_token) {
            this.authenticationService.setAccessToken(result.access_token);
            //this.authenticationService.decodeToken();
            this.router.navigate(['task/list']);
          }
        });
    }
  }
}
