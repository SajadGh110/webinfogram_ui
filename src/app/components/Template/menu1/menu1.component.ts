import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-menu1',
  standalone: true,
  templateUrl: './menu1.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./menu1.component.scss']
})
export class Menu1Component implements OnInit{
  Status:boolean = false;
  constructor(private auth:AuthService) {}
  ngOnInit() {
    this.Status = this.auth.isLoggedIn();
  }
}
