import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: any;
  showIcons = false;
  uploadDialog: boolean = false
  createDialog: boolean = false
  updateDialog: boolean = false;
  fileToUpload: any;
  createTeamForm: FormGroup;
  updateTeamForm: FormGroup;
  teamIdToUpdate: any;
  constructor(private messageService: MessageService,
    private userService: UserService, private fb: FormBuilder, 
    private teamService: TeamService,private confirmationService: ConfirmationService) {

    //create team form
    this.createTeamForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })
    //update team form
    this.updateTeamForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })

  }


  ngOnInit() {
    this.getUserById();
    this.messageService.add({ key: 'toast1', severity: 'success', summary: 'welcome', detail: '' })

  }
  getUser() {
    const userstring = localStorage.getItem('user');
    this.user = userstring?.length ? JSON.parse(userstring) : null;
  }

  onSelected(event) {
    this.fileToUpload = event.files[0];
  }

  uploadHandler() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    this.userService.uploadImage(formData).subscribe({
      next: (url) => {
        this.user.profileImageUrl = url['imageUrl'];
        // localStorage.setItem('user',JSON.stringify(this.user));
        this.uploadDialog = false;
        this.messageService.add({ key: 'toast1', severity: 'success', summary: 'done' })
      },
      error: (err) => {
        this.messageService.add({ key: 'toast1', severity: 'error', summary: err.error, detail: '' })
      }
    })
  }
  createTeam() {
    this.teamService.Create(this.createTeamForm.value).subscribe({
      next: (res) => {
        this.getUserById();
        this.createDialog = false;
        this.createTeamForm.reset();
        this.messageService.add({ key: 'toast1', severity: 'success', summary: res['name'] + ' ' + 'is created' })
      },
      error: (err) => {
        this.messageService.add({ key: 'toast1', severity: 'error', summary: err.error, detail: '' })
      }
    })
  }
  getUserById() {
    this.userService.getUserById().subscribe((user) => {
      this.user = user;
      // localStorage.setItem('user',JSON.stringify(this.user));
    })
  }
  updateTeam() {
    this.teamService.Update(this.teamIdToUpdate, this.updateTeamForm.value).subscribe({
      next: (team) => {
        this.getUserById();
        this.updateDialog = false;
        this.updateTeamForm.reset();
        this.messageService.add({ key: 'toast1', severity: 'success', summary: team['name'] + ' ' + 'is updated' })
      },
      error:(err)=>{
         this.messageService.add({ key: 'toast1', severity: 'error', summary: err.error, detail: '' })
      }
    })
  }
  openUpdateDialog(item) {
    this.updateTeamForm.patchValue({
      name:item.name,
      description:item.description
    })
    this.teamIdToUpdate = item.id;
    this.updateDialog = true
  }
  deleteTeam(id){
    this.teamService.Delete(id).subscribe({
      next:(res)=>{
        this.getUserById();
         this.messageService.add({ key: 'toast1', severity: 'success', summary: 'deleted'  })
      },
      error:(err)=> {
         this.messageService.add({ key: 'toast1', severity: 'error', summary: err.error, detail: '' })
      },
    })
  }


 confirm2(event: Event,id) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",

            accept: () => {
                this.deleteTeam(id);
            },
            reject: () => {
                this.messageService.add({ key:'toast1',severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }




}
