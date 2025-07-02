import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { LoadingService } from '../components/loading/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService=inject(LoadingService);
  loadingService.show();
  return next(req).pipe(
    delay(100),
    finalize(()=>{
      loadingService.hide();
    })
  );
};
