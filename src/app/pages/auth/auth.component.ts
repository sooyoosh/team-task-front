import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
//
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AuthService } from '../../services/auth.service';
//


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  animations: [
    trigger('formTransition', [
      state('true', style({ opacity: 1, transform: 'translateX(0)' })),
      state('false', style({ opacity: 1, transform: 'translateX(0)' })),

      transition('true <=> false', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('300ms ease-in-out'),
      ]),
    ]),
  ],
})
export class AuthComponent implements OnInit {
  registerForm: FormGroup
  loginForm: FormGroup
  isRegister: boolean = true

  constructor(private fb: FormBuilder, private messageService: MessageService,
    private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      fullName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }


  ngOnInit() {
    localStorage.removeItem('user');
  }


  register() {
    this.authService.Register(this.registerForm.value).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.authService.isLogedIn.set(true);
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        this.messageService.add({ key: 'toast1', severity: 'error', summary: err.error, detail: '' })
      }
    })

  }

  login() {
    this.authService.Login(this.loginForm.value).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.authService.isLogedIn.set(true);
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        this.messageService.add({ key: 'toast1', severity: 'error', summary: err.error, detail: '' })
      }
    })
  }





}
