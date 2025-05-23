import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit{
  Status:boolean = false;
  constructor(private auth:AuthService) {}
  ngOnInit() {
    this.Status = this.auth.isLoggedIn();
  }
}
