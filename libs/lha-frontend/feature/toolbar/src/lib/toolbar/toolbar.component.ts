import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, AuthenticationState, postLogout, selectAuthenticationLoaded, selectAuthenticationState } from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { RoleService } from '@lighthouse-automation/lha-frontend/data-access/role';
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
    //this.authenticated = this.authenticationService.loggedIn();
    this.store
      .select<AuthenticationState>(selectAuthenticationState)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        if (state.accessToken && state.loaded) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
      });

    if (this.authenticated) {
      this.roleService.isAdmin().subscribe((result: any) => {
        if (result && result.isAdmin && result.isAdmin === true) {
          this.isAdmin = true;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout() {
    this.store.dispatch(postLogout());
  }
}
