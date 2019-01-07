import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserAccountInfoModel } from '../model/user-account-info-model';
import { AccountManagementService } from './account-management-service';

@Injectable({
    providedIn: 'root',
})
export class UserRepositoryService {
    readonly baseUrl = '/api/';

    constructor(private http: HttpClient, private accountManager: AccountManagementService) { }

    getUsers(page: number, amount: number): Observable<UserAccountInfoModel[]> {
        const currentUrl = `${this.baseUrl}users/?page=${page}&amount=${amount}`;
        return this.http.get<UserAccountInfoModel[]>(currentUrl, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('tokenKey')
            }
        });
    }

    getUser(email: string): Observable<UserAccountInfoModel> {
        const currentUrl = `${this.baseUrl}users/${email}`;
        return this.http.get<UserAccountInfoModel>(currentUrl);
    }

    getCurrentUser(): Observable<UserAccountInfoModel> {
        const currentUrl = `${this.baseUrl}currentuser`;
        return this.http.get<UserAccountInfoModel>(currentUrl, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('tokenKey')
            }
        });
    }

    getSellerUser(lotId: number): Observable<UserAccountInfoModel> {
        const currentUrl = `${this.baseUrl}lots/${lotId}/selleruser`;
        return this.http.get<UserAccountInfoModel>(currentUrl);
    }

    getBuyerUser(lotId: number): Observable<UserAccountInfoModel> {
        const currentUrl = `${this.baseUrl}lots/${lotId}/buyeruser`;
        return this.http.get<UserAccountInfoModel>(currentUrl);
    }

    putUser(email: string, user: UserAccountInfoModel): Observable<UserAccountInfoModel> {
        const currentUrl = `${this.baseUrl}users/?email=${email}`;
        return this.http.put<UserAccountInfoModel>(currentUrl, user, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('tokenKey')
            }
        });
    }
}
