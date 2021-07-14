import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  lastLog:string;
  isActive:boolean= false;

  printLog(msg:String){
    if(this.isActive) {
    const timeStamp:Date = new Date();
    const logMsg = '[' + timeStamp.toLocaleTimeString() +'] ' +  msg
    console.log('logMsg' , logMsg);
    console.log('lastLog' , this.lastLog);
    this.lastLog = logMsg;
    }
  }
  constructor() { }
}
