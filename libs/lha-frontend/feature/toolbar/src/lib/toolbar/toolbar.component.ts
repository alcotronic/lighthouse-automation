import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@lighthouse-automation/lha-frontend/api/authentication';
import { RoleService } from '@lighthouse-automation/lha-frontend/api/role';

@Component({
  selector: 'lha-frontend-feature-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  isLoggedIn = false;
  isAdmin = false;
  letItSnow = false;

  constructor(
    private authenticationService: AuthenticationService,
    private roleService: RoleService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.loggedIn();
    this.roleService.isAdmin().subscribe((result: any) => {
      if (result && result.isAdmin && result.isAdmin === true) {
        this.isAdmin = true;
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
