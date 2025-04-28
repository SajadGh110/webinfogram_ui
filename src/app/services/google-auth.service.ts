import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppConfigService} from "./app-config.service";
@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private clientId = '';
  private redirectUri = this.appConfigService.getSiteUrl()+'getcode';
  private AccessType = "offline";
  private Prompt = "consent";
  private scope = 'https://www.googleapis.com/auth/webmasters';
  private authEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  constructor(private route:ActivatedRoute, private appConfigService: AppConfigService) {}

  public google_login(client_id: string):string{
    this.clientId = client_id;
    return `${this.authEndpoint}?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}&access_type=${this.AccessType}&prompt=${this.Prompt}`;
  }
}
