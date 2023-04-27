import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationState,
  selectAuthenticationState,
} from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { StatusService } from '@lighthouse-automation/lha-frontend/data-access/status';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

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
    private authenticationStore: Store<AuthenticationState>
  ) {}

  ngOnInit() {
    this.authenticationStore
      .select<AuthenticationState>(selectAuthenticationState)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        if (state.accessToken) {
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
        console.log(this.authenticated);
        if (this.authenticated && this.status.initiated) {
          console.log('this.authenticated && this.status.initiated');
          this.router.navigate(['task/list']);
        } else if (!this.authenticated && this.status.initiated) {
          console.log('!this.authenticated && this.status.initiated');
          this.router.navigate(['login']);
        } else  {
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
