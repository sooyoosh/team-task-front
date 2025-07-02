import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  let authSevice=inject(AuthService);
  let router=inject(Router);  
  let user=localStorage.getItem('user');

  if(authSevice.isLogedIn() || user?.length ){
    return true
  }else{
    router.navigate(['/'])
    return false;
  }

};
