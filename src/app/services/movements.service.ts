import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Res } from '../components/movements/movements.component';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  private API = 'https://random-data-api.com/api/v2/users?size=10&is_xml=true';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<Res[]>(this.API);
  }
}
