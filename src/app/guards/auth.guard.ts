import {CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {NgToastService} from "ng-angular-popup";


@Injectable({
  providedIn: 'root'
})
class AuthGuard{
  constructor(private auth : AuthService, private router : Router, private toast : NgToastService) {

  }
  canActivate(): boolean {
    if (this.auth.isLoggedIn()){
      return true;
    } else {
      this.toast.error({detail:"ERROR" , summary:"Please Login First!"});
      this.router.navigate(['login']);
      return false;
    }
  }

  IsSignedIn(): boolean {
    if (this.auth.isLoggedIn()){
      this.toast.info({detail:"Redirect" , summary:"You Are Signed In Currently , Go to Your dashboard!"});
      this.router.navigate(['dashboard']);
      return false;
    } else {
      return true;
    }
  }
}

export const authGuard: CanActivateFn = ():boolean => {
  return inject(AuthGuard).canActivate();
};
export const loginCheck: CanActivateFn = ():boolean => {
  return inject(AuthGuard).IsSignedIn();
};
