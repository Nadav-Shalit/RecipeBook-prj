

export class User {
    
    constructor(public email:string,
        public id:string,
        private _token:string,
        private _expiredDate:Date){
    }

    get token() { 
        // console.log('this',this);
        return (this._expiredDate  || new Date() > this._expiredDate ) ?  this._token : null;
    }
    get expiredDate() {
        return this._expiredDate;
    }
}