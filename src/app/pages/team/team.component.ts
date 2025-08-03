import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { TeamService } from '../../services/team.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit{
  teamId: number;

  constructor(private route:ActivatedRoute,private teamService:TeamService){

  }


  ngOnInit() {
    this.route.params.subscribe((id)=>{
      this.teamId=+id['id']
    })
     this.gettingTeam();
  }
  gettingTeam(){
    this.teamService.GetTeamDetails(this.teamId).subscribe({
      next:(data)=>{
      },
      error:(err)=>{
      }
    })
  }



}
