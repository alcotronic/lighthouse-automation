import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationFacade } from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { StatusService } from '@lighthouse-automation/lha-frontend/data-access/status';

@Component({
  selector: 'lha-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lha-frontend';
  status: any;
  authenticated = false;
  unsubscribe$ = new Subject<void>();

  constructor(
    private statusService: StatusService,
    private router: Router,
    private authenticationFacade: AuthenticationFacade
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
      .subscribe((status: any) => {
        this.status = status;
        //console.log(this.authenticated);
        if (this.authenticated && this.status.initiated) {
          console.log('this.authenticated && this.status.initiated');
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
