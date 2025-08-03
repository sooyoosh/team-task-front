import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogedIn = signal<boolean>(false);

  constructor(private http: HttpClient) { }

  Register(model) {
    return this.http.post(environment.apiBaseUrl + 'register', model);
  }

  Login(model) {
    return this.http.post(environment.apiBaseUrl + 'login ', model);
  }

  RefreshToken() {
    const user = localStorage.getItem('user');
    if (!user) return throwError(() => new Error("No User Data"))
    const parsed = JSON.parse(user);
    return this.http.post(environment.apiBaseUrl + 'refresh-token', {
      token: parsed.token,
      refreshToken: parsed.refreshToken
    })
  }







}
