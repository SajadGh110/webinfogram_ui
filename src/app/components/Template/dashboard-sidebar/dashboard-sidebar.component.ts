import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Title} from "@angular/platform-browser";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.scss'
})
export class DashboardSidebarComponent {
  constructor(private auth : AuthService,private title:Title) {
  }

  getTitle():string{
    return this.title.getTitle();
  }
  logout(){
    this.auth.logout();
  }
}
