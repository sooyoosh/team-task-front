import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient) { }

  Register(model){
    return this.http.post(environment.apiBaseUrl+'register',model);
  }

  Login(model){
    return this.http.post(environment.apiBaseUrl+'login ',model);
  }
  

 



}
