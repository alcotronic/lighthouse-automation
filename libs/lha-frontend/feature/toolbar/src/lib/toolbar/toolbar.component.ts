import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { RoleService } from '@lighthouse-automation/lha-frontend/data-access/role';

@Component({
  selector: 'lha-frontend-feature-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(
    private authenticationService: AuthenticationService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.loggedIn();
    if (this.isLoggedIn) {
      this.roleService.isAdmin().subscribe((result: any) => {
        if (result && result.isAdmin && result.isAdmin === true) {
          this.isAdmin = true;
        }
      });
    }
  }

  logout() {
    this.authenticationService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }
}
