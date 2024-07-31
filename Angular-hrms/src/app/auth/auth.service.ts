import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { authData } from '../shared/auth-interface'
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiBaseUrl = 'http://localhost:5000/api'

  constructor(private http: HttpClient) { }

  login(authData: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/auth/login`, authData);
  }
}
