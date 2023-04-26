import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleService {
  isAdminUrl = '/api/user/admin';

  constructor(private readonly http: HttpClient) {}

  isAdmin() {
    return this.http.get(this.isAdminUrl);
  }
}