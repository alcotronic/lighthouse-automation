import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from '@lighthouse-automation/lha-frontend/api/authentication';

@Component({
  selector: 'lha-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  usernameControl = new FormControl('');
  passwordControl = new FormControl('');

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = formBuilder.group({});
  }

  async clickLogin() {
    console.log('login');
    if (this.usernameControl.value && this.passwordControl.value) {
      const pass = CryptoJS.SHA256(this.passwordControl.value).toString(
        CryptoJS.enc.Base64,
      );
      this.authenticationService
        .login(this.usernameControl.value, pass)
        .subscribe((result: any) => {
          if (result && result.access_token) {
            this.authenticationService.setAccessToken(result.access_token);
            //this.authenticationService.decodeToken();
            this.router.navigate(['report-task']);
          }
        });
    }

  }
}
