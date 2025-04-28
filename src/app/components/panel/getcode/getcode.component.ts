import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../../services/profile.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-getcode',
  standalone: true,
  imports: [],
  templateUrl: './getcode.component.html',
  styleUrl: './getcode.component.scss'
})
export class GetcodeComponent implements OnInit{
  public constructor(private router:Router, private profile:ProfileService, private toast:NgToastService) {
  }

  public ngOnInit() {
    const href = window.location.href;
    const match = href.match(/code=([^&]+)/);
    const code = match ? match[1] : null;
    this.profile.savetoken(code).subscribe({
      error:(res=>{
        if (res.status == 200){
          this.router.navigate(['profile']).then(r => this.toast.success({detail:"SUCCESS",summary:res.error.text,duration:5000, position:'topRight'}));
        }
        else
          this.toast.error({detail:"ERROR",summary:res.error,duration:5000, position:'topRight'});
      })
    })

  }
}
