import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  // todo: buscar alguna API que retorne por fhechas en el query params
  private NASA_API = (firstDate: string, secondDate: string) =>
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${firstDate}&end_date=${secondDate}&api_key=TAzhUuatmak6ZEMWlykb18slm7g4cHbhr9mevpIK`;

  constructor(private http: HttpClient) {}

  getNearestObjectsBetweenDates(firstDate: string, secondDate: string) {
    return this.http.get(this.NASA_API(firstDate, secondDate));
  }
}
