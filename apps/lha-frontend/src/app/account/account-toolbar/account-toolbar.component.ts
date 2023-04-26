import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { RoleService } from '@lighthouse-automation/lha-frontend/data-access/role';

@Component({
  selector: 'lha-app-account-toolbar',
  templateUrl: './account-toolbar.component.html',
  styleUrls: ['./account-toolbar.component.scss'],
})
export class AccountToolbarComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
