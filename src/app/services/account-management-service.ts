import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserRegistrationModel } from '../model/user-registration-model';
import {UserAccountInfoModel  } from '../model/user-account-info-model';

@Injectable({
    providedIn: 'root',
})
export class AccountManagementService {
    readonly baseUrl = '/api/';

    constructor(private http: HttpClient) { }

    register(user: UserRegistrationModel): Observable<any> {
        const currentUrl = `${this.baseUrl}account/register`;
        return this.http.post(currentUrl, user);
    }

    login(email: string, password: string): Observable<any> {
        const loginData = `grant_type=password&username=${email}&password=${password}`;

        const currentUrl = `${this.baseUrl}token`;

        return this.http.post<any>(currentUrl, loginData);
    }

    validatePassword(email: string, password: string): Observable<any> {
        const loginData = `grant_type=password&username=${email}&password=${password}`;

        const currentUrl = `${this.baseUrl}token`;

        return this.http.post<any>(currentUrl, loginData);
    }

    logout() {
        const currentUrl = `${this.baseUrl}account/logout`;
        this.http.post<any>(currentUrl, null, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('tokenKey')
            }
        }).subscribe();
        sessionStorage.removeItem('tokenKey');
    }

    deleteAccount(email: string): Observable<any> {
        const currentUrl = `${this.baseUrl}account/deleteuser/?userName=${email}`;
        return this.http.delete(currentUrl, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('tokenKey')
            }
        });
    }
}
