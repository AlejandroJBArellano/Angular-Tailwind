import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  private API_ROUTE_SALARIES =
    'https://api.teleport.org/api/countries/iso_alpha2:AF/salaries/';

  constructor(private http: HttpClient) {}

  getAFSalaries() {
    return this.http.get(this.API_ROUTE_SALARIES);
  }
}
