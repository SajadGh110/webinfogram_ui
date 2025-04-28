import { Component } from '@angular/core';
import {DashboardSidebarComponent} from "../../Template/dashboard-sidebar/dashboard-sidebar.component";
import {Menu1Component} from "../../Template/menu1/menu1.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    DashboardSidebarComponent,
    Menu1Component
  ],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
}
