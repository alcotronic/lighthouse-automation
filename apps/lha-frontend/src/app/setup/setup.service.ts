import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SetupService {
  createFirstAdminUrl = '/api/setup';

  constructor(private readonly http: HttpClient) {}

  createFirstAdminUser(username: string, email: string, password: string) {
    return this.http.post(this.createFirstAdminUrl, {
      username: username,
      email: email,
      password: password,
    });
  }
}
