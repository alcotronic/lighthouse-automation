import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role } from '@lighthouse-automation/lha-common';
import { AuthenticationFacade } from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { RoleFacade } from '@lighthouse-automation/lha-frontend/data-access/role';
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
    private authenticationFacade: AuthenticationFacade,
    private roleFacade: RoleFacade
  ) {}

  ngOnInit() {
    this.authenticationFacade.selectAuthenticationAccessToken$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((accessToken) => {
        if (accessToken) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
      });
    this.roleFacade.selectAllRoles$
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
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout() {
    this.authenticationFacade.postLogout();
  }
}
