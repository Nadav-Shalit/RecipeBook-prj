import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authSrv:AuthService,
    private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): 
  boolean |
  UrlTree | 
  Promise<boolean | UrlTree> | 
  Observable<boolean | UrlTree>  
  {
    return this.authSrv.user.pipe(
      take(1),
      map(
        (user) =>
        {
          const isAuth = !!user;
           if(isAuth) {
             return isAuth;
           } else {
             return this.router.createUrlTree(['/auth']);
           }          
        }
      )
    );
  }
}
