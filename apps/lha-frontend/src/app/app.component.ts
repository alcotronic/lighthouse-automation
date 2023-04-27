import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, AuthenticationState, selectAuthenticationLoaded, selectAuthenticationState } from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { StatusService } from '@lighthouse-automation/lha-frontend/data-access/status';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lha-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lha-frontend';
  status: any;
  authenticated = false;
  unsubscribe$ = new Subject<void>();

  constructor(
    private statusService: StatusService,
    private router: Router,
    private store: Store<AuthenticationState>
  ) {
    this.store
      .select<AuthenticationState>(selectAuthenticationState)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        if (state.accessToken) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
          this.router.navigate(['login']);
        }
      });
  }

  ngOnInit() {

    this.statusService.getStatus().subscribe((status: any) => {
      console.log(status);
      this.status = status;
      if (!this.authenticated && this.status.initiated) {
        this.router.navigate(['login']);
      } else if (this.authenticated && this.status.initiated) {
        this.router.navigate(['task/list']);
      } else {
        this.router.navigate(['setup']);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
