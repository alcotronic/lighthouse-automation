import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleService } from '@lighthouse-automation/lha-frontend/data-access/role';
import {
  AuthenticationService,
  AuthenticationState,
  selectAuthenticationState,
} from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { Observable, Subject, map, take, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements OnDestroy {
  authenticated = false;
  unsubscribe$ = new Subject<void>();

  constructor(
    private authenticationService: AuthenticationService,
    private roleService: RoleService,
    private router: Router,
    private store: Store<AuthenticationState>
  ) {
    this.store
    .select<AuthenticationState>(selectAuthenticationState)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((state: AuthenticationState) => {
      if (state.accessToken && state.loaded) {
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
    // const helper = new JwtHelperService();
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
    if (this.authenticated) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
