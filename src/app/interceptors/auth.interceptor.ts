import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService=inject(AuthService);
  const user=localStorage.getItem('user')
  const userOb=user? JSON.parse(user):null
  const token=userOb? userOb.token:null
  const authReq= token? req.clone({
    setHeaders: {Authorization:`Bearer ${token}`}
  }):req;
  
  //
  return next(authReq).pipe(
    catchError((error:HttpErrorResponse)=>{
      if(error.status===401 && userOb?.refreshTokens){
        return authService.RefreshToken().pipe(

          switchMap((res:any)=>{
             const updatedUser = {
              ...userOb,
              token: res.accessToken,
              refreshToken: res.refreshToken
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${res.accessToken}` }
            });

            return next(retryReq);
          }),

           catchError(refreshError => {
            // localStorage.removeItem('user');
            return throwError(()=>refreshError);
          })


        );
      }




       return throwError(() => error);

    })
  );




};
