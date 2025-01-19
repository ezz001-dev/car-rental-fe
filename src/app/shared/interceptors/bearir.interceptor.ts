import { HttpInterceptorFn } from '@angular/common/http';

export const bearirInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  return next(newReq);
};
