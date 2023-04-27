import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import {
  AuthenticationState,
  postLogin,
  selectAuthenticationState,
} from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lha-frontend-feature-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = this.formBuilder.group({
    usernameControl: ['', Validators.required],
    passwordControl: ['', Validators.required],
  });
  unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storeAuthentication: Store<AuthenticationState>
  ) {}

  ngOnInit(): void {
    this.storeAuthentication
      .select<AuthenticationState>(selectAuthenticationState)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        if (state.accessToken) {
          this.router.navigate(['task/list']);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

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
