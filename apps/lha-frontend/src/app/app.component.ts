import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@lighthouse-automation/lha-frontend/api/authentication';
import { StatusService } from '@lighthouse-automation/lha-frontend/api/status';

@Component({
  selector: 'lha-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lha-frontend';
  status: any;
  loggedIn = false;

  constructor(
    private authenticationService: AuthenticationService,
    private statusService: StatusService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loggedIn = this.authenticationService.loggedIn();
    console.log(this.loggedIn);
    this.statusService.getStatus().subscribe((status: any) => {
      console.log(status);
      this.status = status;
      if (!this.loggedIn && this.status.initiated) {
        this.router.navigate(['login']);
      } else if (this.loggedIn && this.status.initiated) {
        this.router.navigate(['task/list']);
      } else {
        this.router.navigate(['setup']);
      }
    });
  }
}
