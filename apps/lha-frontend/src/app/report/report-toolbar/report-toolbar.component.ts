import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../role/role.service';
import { AuthenticationService } from '@lighthouse-automation/lha-frontend/api/authentication';

@Component({
  selector: 'lha-app-report-toolbar',
  templateUrl: './report-toolbar.component.html',
  styleUrls: ['./report-toolbar.component.scss'],
})
export class ReportToolbarComponent implements OnInit {
  isAdmin = false;
  letItSnow = false;

  constructor(
    private authenticationService: AuthenticationService,
    private roleService: RoleService,
    private router: Router,
  ) {}

  ngOnInit() {
    //this.snowService.enableSnow();
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
