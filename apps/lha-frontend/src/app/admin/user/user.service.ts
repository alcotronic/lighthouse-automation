import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from './role.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userListUrl = '/api/user/list';
  userCreateUrl = '/api/user/create';

  constructor(private readonly http: HttpClient) {}

  getUsers() {
    return this.http.get(this.userListUrl);
  }

  createUser(
    username: string,
    email: string,
    password: string,
    roles: Role[],
    activated: boolean,
  ) {
    return this.http.post(this.userCreateUrl, {
      username: username,
      email: email,
      password: password,
      roles: roles,
      activated: activated,
    });
  }
}
