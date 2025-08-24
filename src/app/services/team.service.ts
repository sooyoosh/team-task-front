import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http:HttpClient) { }


  Create(body){
    return this.http.post(environment.apiBaseUrl+'team/create',body);
  }
  Update(id,body){
    return this.http.put(environment.apiBaseUrl+`team/update/${id}`,body);
  }
  Delete(id){
    return this.http.delete(environment.apiBaseUrl+`team/delete/${id}`);
  }

  GetTeamDetails(id){
    return this.http.get(environment.apiBaseUrl+`team/${id}`)
  }
  InviteUser(teamId,invitedUserId,roleId){
    return this.http.get(environment.apiBaseUrl+`team/inviteUser/${teamId}/${invitedUserId}/${roleId}`)
  }
  GetPendingInvitationsForUser(){
    return this.http.get(environment.apiBaseUrl+`team/invitations/pending`)
  }
  RespondToInvitation(invitionId,accept:boolean){
    let model={}
    let params=new HttpParams();
    params=params.append('accept',accept.toString().toLocaleLowerCase())
    return this.http.post(environment.apiBaseUrl+`team/respond/${invitionId}`,model,{params})
  }
}
