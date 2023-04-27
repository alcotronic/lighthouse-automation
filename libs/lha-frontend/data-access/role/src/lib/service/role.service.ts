import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '@lighthouse-automation/lha-common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleService {
  isAdminUrl = '/api/user/admin';
  roleUrl = '/api/role';

  constructor(private readonly http: HttpClient) {}

  isAdmin() {
    return this.http.get(this.isAdminUrl);
  }

  getCurrentUserRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.roleUrl + '/user');
  }
}
