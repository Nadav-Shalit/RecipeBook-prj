import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface AuthResponseData{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string,
  registered?:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiKey = environment.fireBaseApiKey;// 'AIzaSyAjSdSBdTEOgaKH6UsN3hoUj6eFqAkt-Pc';
  user = new BehaviorSubject<User>(null);
  localStorageUserItem = 'recipeBookUser';
  logoutTimoutRef:any;
  constructor(private http:HttpClient,
    private router:Router) { }
  
  signUp(email:string, pass:string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ this.apiKey,
    {
      email:email,
      password:pass,
      returnSecureToken:true
    }
    ).pipe(catchError(this.handleErrors),
    tap(
      (responseData:AuthResponseData) => {
        this.handelAutUser(responseData);
      }
      )
    );
  }

  logIn(email:string, pass:string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ this.apiKey,
    {
      email:email,
      password:pass,
      returnSecureToken:true
    }
    ).pipe(catchError(this.handleErrors),
    tap(
      (responseData:AuthResponseData) => {
        this.handelAutUser(responseData);                            
      }
    )
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem(this.localStorageUserItem);
    if(this.logoutTimoutRef){
      clearTimeout(this.logoutTimoutRef);
    }
    this.logoutTimoutRef= null
  }

  autoLogin() {
    const userData:{
      email:string;
      id:string;
      _token:string;
      _expiredDate:Date;
    } = JSON.parse(localStorage.getItem(this.localStorageUserItem));
    if(!userData){
      return;
    }
    const user:User = new User(userData.email,
      userData.id,
      userData._token,
      new Date(userData._expiredDate)
      );
      if(user.token){
        this.user.next(user);
        this.autoLogout(user.expiredDate);
      }
  }

  autoLogout(destDate:Date){
     const duretion:number = destDate.getTime()-new Date().getTime();
     if(this.logoutTimoutRef) {
       clearTimeout(this.logoutTimoutRef);
     }
     console.log('duretion:',duretion/1000);
      this.logoutTimoutRef = setTimeout(
      () =>
      {
        this.logout();
        console.log('after:', 'logout');
      }
      , duretion);
  }

  private handelAutUser(responseData:AuthResponseData){
    let expDate:Date = new Date();
    expDate.setSeconds(expDate.getSeconds() + +responseData.expiresIn);
    const user = new User(responseData.email, 
                          responseData.localId,
                          responseData.idToken,
                          expDate
                          ); 
    this.user.next(user);
    localStorage.setItem(this.localStorageUserItem,JSON.stringify(user) );
    let curDate:Date = new Date();
    this.autoLogout(user.expiredDate);  
  }
  private handleErrors(errorRes:HttpErrorResponse) {
    let errMsg = 'Authentication error:' + errorRes;   
      if(!!errorRes.error.error.message) {
        errMsg =   'Authentication error: ' + errorRes.error.error.message;
      }    
    return throwError(errMsg);
  }

}
