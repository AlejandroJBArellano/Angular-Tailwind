import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BalancesService {
  private API_ROUTE_SALARIES =
    'https://api.teleport.org/api/countries/iso_alpha2:MX/salaries/';
  private API_ROUTE_HOUSE_PRICES =
    'https://www.econdb.com/api/series/HOUUS/?format=json';
  constructor(private http: HttpClient) {}

  getSalaries() {
    return this.http.get(this.API_ROUTE_SALARIES);
  }
  getHousePrices() {
    return this.http.get(this.API_ROUTE_HOUSE_PRICES);
  }
}
