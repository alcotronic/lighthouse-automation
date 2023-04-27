import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@lighthouse-automation/lha-common';
import {
  AuthenticationService,
  AuthenticationState,
  postLogout,
  selectAuthenticationState,
} from '@lighthouse-automation/lha-frontend/data-access/authentication';
import {
  RoleService,
  selectAllRoles,
} from '@lighthouse-automation/lha-frontend/data-access/role';
import { State, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lha-frontend-feature-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  authenticated = false;
  isAdmin = false;
  unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AuthenticationState>,
    private authenticationService: AuthenticationService,
    private roleService: RoleService,
    private router: Router,
    private state: State<AuthenticationState>
  ) {}

  ngOnInit() {
    this.store
      .select(selectAllRoles)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((roles) => {
        if (roles) {
          roles.forEach((role) => {
            if (role === Role.Admin) {
              this.isAdmin = true;
            }
          });
        }
      });
    this.store
      .select<AuthenticationState>(selectAuthenticationState)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        if (state.accessToken) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
      });

    // if (this.authenticated) {
    //   this.roleService.isAdmin().subscribe((result: any) => {
    //     if (result && result.isAdmin && result.isAdmin === true) {
    //       this.isAdmin = true;
    //     }
    //   });
    // }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout() {
    this.store.dispatch(postLogout());
  }
}
