import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {
  loginUrl = '/api/authentication/login';

  constructor(private readonly http: HttpClient) {}

  postLogin(username: string, password: string) {
    return this.http.post(this.loginUrl, {
      username: username,
      password: password,
    });
  }

  decodeToken() {
    const helper = new JwtHelperService();
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = helper.decodeToken(accessToken);
      const expirationDate = helper.getTokenExpirationDate(accessToken);
      const isExpired = helper.isTokenExpired(accessToken);
      console.log('decodedToken: ' + decodedToken);
      console.log('expirationDate: ' + expirationDate);
      console.log('isExpired: ' + isExpired);
    }
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  removeAccessToken() {
    localStorage.removeItem('accessToken');
  }

  // loggedIn(): boolean {
  //   return localStorage.getItem('access_token') !== null;
  // }
}
