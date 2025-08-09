import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { UserService } from '../../services/user.service';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit {
  teamId: number;
  team: any;
  users: any;
  members: any;
  invitionDialog: boolean = false;
  selectedUsers: any;
  filterValue: any;
  constructor(private route: ActivatedRoute,
    private teamService: TeamService, private userService: UserService,private messageService: MessageService,) {

  }


  ngOnInit() {
    this.route.params.subscribe((id) => {
      this.teamId = +id['id']
    })
    this.gettingTeam();
    this.gettingUser();
  }
  gettingTeam() {
    this.teamService.GetTeamDetails(this.teamId).subscribe({
      next: (data) => {
        debugger
        this.team = data
        this.members = data['members'];
      },
      error: (err) => {

      }
    })
  }
  gettingUser() {
    this.userService.getAllUser().subscribe((data) => {
      this.users = data
    })
  }

  customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions) {
    if (options.filter) {
      options.filter(event);
    }
  }
  resetFunction(options: DropdownFilterOptions) {
    if (options.reset) {
     options.reset();
    }
    this.filterValue = '';
  }

  inviteUser(){
    this.teamService.InviteUser(this.teamId,this.selectedUsers['id']).subscribe((data)=>{
      this.invitionDialog=false;
      this.selectedUsers=null
      this.filterValue = '';
       this.messageService.add({ key: 'toast1', severity: 'success', summary: '', detail: 'invite is sent!' })
    },
  (err)=>{
     this.messageService.add({ key: 'toast1', severity: 'error', summary: '', detail: 'fail' })
     this.invitionDialog=false;
      this.selectedUsers=null
      this.filterValue = '';
  })
  }
}
