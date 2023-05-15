import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusDto } from '@lighthouse-automation/lha-common';

@Injectable()
export class StatusService {
  statusUrl = 'api/status';

  constructor(private readonly http: HttpClient) {}

  getStatus() {
    return this.http.get<StatusDto>(this.statusUrl);
  }
}
