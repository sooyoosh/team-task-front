import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const user=localStorage.getItem('user')
  const userOb=user? JSON.parse(user):null
  const token=userOb? userOb.token:null
  const authReq= token? req.clone({
    setHeaders: {Authorization:`Bearer ${token}`}
  }):req
  return next(authReq);
};
