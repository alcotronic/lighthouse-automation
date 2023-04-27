import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StatusService {
  statusUrl = 'api/status';

  constructor(private readonly http: HttpClient) {}

  getStatus() {
    return this.http.get(this.statusUrl);
  }
}
