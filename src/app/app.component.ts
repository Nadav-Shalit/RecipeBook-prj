import { LoggingService } from './logging.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
constructor (private authSrv:AuthService,
  private logSrv:LoggingService ){}

ngOnInit(): void {
  this.authSrv.autoLogin();
  this.logSrv.printLog('AppComponent ngOnInit:16');
  // console.log('after autoLogin', this.authSrv.user.value);
}
}
