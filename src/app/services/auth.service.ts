import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isLogedIn=signal<boolean>(false);

  constructor(private http:HttpClient) { }

  Register(model){
    return this.http.post(environment.apiBaseUrl+'register',model);
  }

  Login(model){
    return this.http.post(environment.apiBaseUrl+'login ',model);
  }
  

 



}
