import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleService } from '../role/role.service';
import { AuthenticationService } from '@lighthouse-automation/lha-frontend/api/authentication';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private roleService: RoleService,
    private router: Router,
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const helper = new JwtHelperService();
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const isExpired = helper.isTokenExpired(accessToken);
      if (isExpired) {
        this.authenticationService.logout();
        this.router.navigate(['']);
        return false;
      } else {
        if (state.url.indexOf('admin') !== -1) {
          this.roleService.isAdmin().subscribe((result: any) => {
            if (result.isAdmin) {
              return true;
            } else {
              return false;
            }
          });
        }
        return true;
      }
    }

    this.router.navigate(['login']);
    return false;
  }
}
