import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  AuthenticationService,
  AuthenticationState,
  postLogout,
  selectAuthenticationState,
} from '@lighthouse-automation/frontend/data-access/authentication';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements OnDestroy {
  authenticated = false;
  unsubscribe$ = new Subject<void>();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<AuthenticationState>
  ) {
    this.store
    .select<AuthenticationState>(selectAuthenticationState)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((state: AuthenticationState) => {
      if (state.accessToken) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  canActivate(): boolean {
    const helper = new JwtHelperService();
    const accessToken = this.authenticationService.getAccessToken();
    if (accessToken) {
      const isExpired = helper.isTokenExpired(accessToken);
      if (isExpired) {
        this.store.dispatch(postLogout());
        this.router.navigate(['']);
        return false;
      }
    }

    // const accessToken = localStorage.getItem('access_token');
    // if (accessToken) {
    //   const isExpired = helper.isTokenExpired(accessToken);
    //   if (isExpired) {
    //     this.authenticationService.logout();
    //     this.router.navigate(['']);
    //     return false;
    //   } else {
    //     if (state.url.indexOf('admin') !== -1) {
    //       this.roleService.isAdmin().subscribe((result: any) => {
    //         if (result.isAdmin) {
    //           return true;
    //         } else {
    //           return false;
    //         }
    //       });
    //     }
    //     return true;
    //   }
    // }

    // this.router.navigate(['login']);
    //console.log(this.authenticated);
    if (this.authenticated) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
