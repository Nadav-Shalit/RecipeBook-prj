import { AuthService } from './auth.service';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorervice implements HttpInterceptor {

  constructor(private authSrv:AuthService) { }

 intercept (req:HttpRequest<any>,next:HttpHandler){

  return this.authSrv.user.pipe(take(1),
     exhaustMap(
        (user) => {
           console.log('user', user);
           if(!user) {
             return next.handle(req);
           } else {

             const modifiedReq = req.clone(
               {
                 params: new HttpParams().set('auth',user.token)
                }  
                )
                return next.handle(modifiedReq);
              }
        }));

  }


 } 



