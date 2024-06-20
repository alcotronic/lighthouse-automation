import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {
  accountUrl = '/api/user/account';
  changePasswordUrl = '/api/user/change/password';

  constructor(private readonly http: HttpClient) {}

  getAccount() {
    return this.http.get(this.accountUrl);
  }

  changePassword(password: string) {
    return this.http.post(this.changePasswordUrl, { password: password });
  }
}
