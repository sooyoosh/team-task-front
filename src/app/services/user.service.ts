import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  uploadImage(file){
   return this.http.post(environment.apiBaseUrl+'upload-profile-image',file);
  }

  getUserById(){
    return this.http.get(environment.apiBaseUrl+'getUserById');
  }
}
