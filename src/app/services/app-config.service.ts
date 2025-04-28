import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private SiteUrl: string = "http://localhost:4200/";
  private ApiUrl: string = "http://localhost:4201/";
  private Token:string = "bearer " + localStorage.getItem('token');
  private ApiKey:string = "DWV1PdzszOW3BLenbB";

  constructor() { }

  getApiUrl():string {
    return this.ApiUrl;
  }

  getSiteUrl():string {
    return this.SiteUrl;
  }

  getToken():string {
    return this.Token;
  }

  getApiKey():string {
    return this.ApiKey;
  }
}
