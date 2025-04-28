import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import {authGuard, loginCheck} from "./guards/auth.guard";
import {SupportComponent} from "./components/support/support.component";
import {AboutComponent} from "./components/about/about.component";
import { DashboardComponent } from './components/panel/dashboard/dashboard.component';
import {View360Component} from "./components/panel/view-360/view-360.component";
import {ProfileComponent} from "./components/panel/profile/profile.component";
import {GetcodeComponent} from "./components/panel/getcode/getcode.component";
import {VisitdateComponent} from "./components/panel/visitdate/visitdate.component";
import {KeywordComponent} from "./components/panel/keyword/keyword.component";
import {DeviceComponent} from "./components/panel/device/device.component";
import {PageComponent} from "./components/panel/page/page.component";
import {LocationComponent} from "./components/panel/location/location.component";

const routes: Routes = [
  {path:'', component: IndexComponent,title:'Webinfogram'},
  {path:'login', component: LoginComponent,title:'Login' , canActivate:[loginCheck]},
  {path:'support', component: SupportComponent,title:'Support'},
  {path:'about', component: AboutComponent,title:'About'},
  {path:'register', component: RegisterComponent,title:'Register' ,canActivate:[loginCheck]},
  {path:'dashboard', component: DashboardComponent,title:'Dashboard' ,canActivate:[authGuard]},
  {path:'profile',component: ProfileComponent,title:'Profile' , canActivate:[authGuard]},
  {path:'view_360', component: View360Component,title:'360 Degrees' ,canActivate:[authGuard]},
  {path:'visit_date', component: VisitdateComponent,title:'Visit Date' ,canActivate:[authGuard]},
  {path:'keyword', component: KeywordComponent,title:'KeyWord' ,canActivate:[authGuard]},
  {path:'device', component: DeviceComponent,title:'Device' ,canActivate:[authGuard]},
  {path:'page', component: PageComponent,title:'Page' ,canActivate:[authGuard]},
  {path:'location', component: LocationComponent,title:'Location' ,canActivate:[authGuard]},
  {path:'getcode', component: GetcodeComponent,title:'Get Code' ,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
