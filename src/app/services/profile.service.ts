import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {format, subDays} from "date-fns";
import {AppConfigService} from "./app-config.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http : HttpClient, private appConfigService: AppConfigService) { }
  header = new HttpHeaders().append("api-key",this.appConfigService.getApiKey()).append("Authorization",this.appConfigService.getToken());

  getinfo():Observable<any>{
    return this.http.get(`${this.appConfigService.getApiUrl()}Users/GetUser`,{headers:this.header});
  }

  useredit(user:any):Observable<any>{
    return this.http.put(`${this.appConfigService.getApiUrl()}Users/EditUser`,user,{headers:this.header});
  }

  savetoken(code:any):Observable<any>{
    return this.http.get(`${this.appConfigService.getApiUrl()}Api/save_token?code=${code}`,{headers:this.header});
  }
}
