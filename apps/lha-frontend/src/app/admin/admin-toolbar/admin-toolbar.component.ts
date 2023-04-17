import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@lighthouse-automation/lha-frontend/api/authentication';

@Component({
  selector: 'lha-app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.scss'],
})
export class AdminToolbarComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
