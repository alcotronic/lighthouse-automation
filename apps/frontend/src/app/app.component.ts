import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { StatusDto } from '@lighthouse-automation/common';
import { AuthenticationFacade } from '@lighthouse-automation/frontend/data-access/authentication';
import { RoleFacade } from '@lighthouse-automation/frontend/data-access/role';
import { StatusService } from '@lighthouse-automation/frontend/data-access/status';

@Component({
  selector: 'lha-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'lha-frontend';
  status?: StatusDto;
  authenticated = false;
  unsubscribe$ = new Subject<void>();

  constructor(
    private statusService: StatusService,
    private router: Router,
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
    this.statusService
      .getStatus()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((status: StatusDto) => {
        this.status = status;
        //console.log(this.authenticated);
        if (this.authenticated && this.status.initiated) {
          console.log('this.authenticated && this.status.initiated');
          this.roleFacade.loadRoles();
          this.router.navigate(['task/list']);
        } else if (!this.authenticated && this.status.initiated) {
          console.log('!this.authenticated && this.status.initiated');
          this.router.navigate(['login']);
        } else {
          console.log('else setup');
          this.router.navigate(['setup']);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
