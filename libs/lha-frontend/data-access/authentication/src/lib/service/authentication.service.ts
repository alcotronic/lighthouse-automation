import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginResultDto, LogoutResultDto } from '../authentication.models';

@Injectable()
export class AuthenticationService {
  authenticationUrl = '/api/authentication';

  constructor(private readonly http: HttpClient) {}

  postLogin(username: string, password: string): Observable<LoginResultDto> {
    return this.http.post<LoginResultDto>(this.authenticationUrl + '/login', {
      username: username,
      password: password,
    });
  }

  getLogout(): Observable<LogoutResultDto> {
    return this.http.get<LogoutResultDto>(this.authenticationUrl + '/logout');
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

  gAccessToken() {
    localStorage.getItem('accessToken');
  }

  // loggedIn(): boolean {
  //   return localStorage.getItem('access_token') !== null;
  // }
}
