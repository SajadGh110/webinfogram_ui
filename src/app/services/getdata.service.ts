import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {format, subDays} from "date-fns";
import {Router} from "@angular/router";
import { AppConfigService } from './app-config.service';
@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  constructor(private http : HttpClient, private router : Router, private appConfigService: AppConfigService) { }
  header = new HttpHeaders().append("api-key",this.appConfigService.getApiKey()).append("Authorization",this.appConfigService.getToken());
  getdata_date(StartDate:string,EndDate:string):Observable<any>{
    return this.http.get(`${this.appConfigService.getApiUrl()}Api/GetData_date?EndDate=${EndDate}&StartDate=${StartDate}`,{headers:this.header});
  }

  getdata_query(StartDate:string,EndDate:string):Observable<any>{
    return this.http.get(`${this.appConfigService.getApiUrl()}Api/GetData_query?EndDate=${EndDate}&StartDate=${StartDate}`,{headers:this.header});
  }

  getdata_country(StartDate:string,EndDate:string):Observable<any>{
    return this.http.get(`${this.appConfigService.getApiUrl()}Api/GetData_country?EndDate=${EndDate}&StartDate=${StartDate}`,{headers:this.header});
  }

  getdata_device(StartDate:string,EndDate:string):Observable<any>{
    return this.http.get(`${this.appConfigService.getApiUrl()}Api/GetData_device?EndDate=${EndDate}&StartDate=${StartDate}`,{headers:this.header});
  }

  getdata_page(StartDate:string,EndDate:string):Observable<any>{
    return this.http.get(`${this.appConfigService.getApiUrl()}Api/GetData_page?EndDate=${EndDate}&StartDate=${StartDate}`,{headers:this.header});
  }
}
