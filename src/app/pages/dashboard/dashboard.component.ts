import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user:any;
  showIcons=false;
  uploadDialog:boolean=false
  createDialog:boolean=false
  fileToUpload: any;
  createTeamForm:FormGroup;
  constructor(private messageService: MessageService,
    private userService:UserService,private fb:FormBuilder){

      //create team form
      this.createTeamForm=this.fb.group({
        name:[null,[Validators.required]],
        description:[null,[Validators.required]],
      })

    }
  
  
  ngOnInit() {
    this.getUser();
    this.messageService.add({ key: 'toast1', severity: 'success', summary: 'welcome', detail: '' })

  }
  getUser(){
    const userstring=localStorage.getItem('user');
    this.user=userstring?.length? JSON.parse(userstring):null;
  }
  
  onSelected(event){
     this.fileToUpload=event.files[0];
    }
    
    uploadHandler(){
      const formData=new FormData();
      formData.append('file',this.fileToUpload);
      this.userService.uploadImage(formData).subscribe({
        next:(url)=>{
          this.user.profileImageUrl=url['imageUrl'];
          localStorage.setItem('user',JSON.stringify(this.user));
          this.uploadDialog=false;
          this.messageService.add({key:'toast1',severity:'success',summary:'done'})
        },
        error:(err)=>{
          this.messageService.add({ key: 'toast1', severity: 'error', summary: err.error, detail: '' })
        }
      })
  }
  createTeam(){
    
  }
}
