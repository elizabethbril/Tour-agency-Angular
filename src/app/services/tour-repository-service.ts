import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TourModel } from '../model/tour-model';
import { TourRequestModel } from '../model/tour-request-model';
import { AccountManagementService } from './account-management-service';
import { UserAccountInfoModel } from '../model/user-account-info-model';


@Injectable({
    providedIn: 'root',
})
export class TourRepositoryService  {
    readonly baseUrl = '/api/';

    constructor(private http: HttpClient, private accountManager: AccountManagementService) { }

    getTours(page: number, amount: number,
       name: string = null,
       category: string = null,
       city: string, country: string): Observable<TourModel[]> {

        // tslint:disable-next-line:max-line-length
        const currentUrl = `${this.baseUrl}tours/?page=${page}&amount=${amount}&name=${name}&category=${category}&city=${city}&country=${country}`;
        return this.http.get<TourModel[]>(currentUrl);
    }

    getUserTour(email: string, page: number,
       name: string = null,
       category: string = null): Observable<TourModel[]> {

        // tslint:disable-next-line:max-line-length
        const currentUrl = `${this.baseUrl}users/${email}/tours/?page=${page}&name=${name}&category=${category}`;
        return this.http.get<TourModel[]>(currentUrl);
    }

    getTour(id: number): Observable<TourModel> {
        const currentUrl = `${this.baseUrl}tours/${id}`;
        return this.http.get<TourModel>(currentUrl);
    }

    postTour(tour: TourRequestModel): Observable<TourRequestModel> {
        const currentUrl = `${this.baseUrl}tours`;
        return this.http.post<TourRequestModel>(currentUrl, tour, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('tokenKey')
            }
        });
    }

    postTourOffer(Name: string, price: number) {
      const currentUrl = `${this.baseUrl}tours/${Name}/offer`;
      return this.http.post<any>(currentUrl, price, {
          headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('tokenKey')
          }
      });
  }

    putTour(id: number, tour: TourModel): Observable<TourModel> {
        const currentUrl = `${this.baseUrl}tours/${id}`;
        return this.http.put<TourModel>(currentUrl, tour, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('tokenKey')
            }
        });
    }

    deleteTour(id: number): Observable<any> {
        const currentUrl = `${this.baseUrl}tours/${id}`;
        return this.http.delete<any>(currentUrl, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('tokenKey')
            }
        });
    }
}
