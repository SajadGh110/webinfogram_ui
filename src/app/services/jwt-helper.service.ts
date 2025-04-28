import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService{
  constructor() {
  }

  public tokenExpired(token:string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
