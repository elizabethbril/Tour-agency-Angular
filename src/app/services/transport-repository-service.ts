import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AccountManagementService } from './account-management-service';
import { TransportModel } from '../model/transport-model';
import { TransportTicketModel } from '../model/transport-ticket-model';

@Injectable({
  providedIn: 'root',
})
export class TransportRepositoryService {
  readonly baseUrl = '/api/';

  constructor(private http: HttpClient, private accountManager: AccountManagementService) { }

  addTransport(tourId: number, transport: TransportModel): Observable<TransportModel> {
      const currentUrl = `${this.baseUrl}tours/${tourId}/transport`;
      return this.http.post<TransportModel>(currentUrl, transport, {
          headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('tokenKey')
          }
      });
  }

  getTransport(id: number): Observable<TransportModel> {
    const currentUrl = `${this.baseUrl}transport/${id}`;
    return this.http.get<TransportModel>(currentUrl);
}
  getUserTransport(email: string, transpoerticket: number, tour: string): Observable<TransportModel[]> {
      const currentUrl = `${this.baseUrl}users/${email}/tickets/?page=${transpoerticket}&tour=${tour}`;
      return this.http.get<TransportModel[]>(currentUrl,
          {
              headers: {
                  'Authorization': 'Bearer ' + sessionStorage.getItem('tokenKey')
              }
          });
  }
}
