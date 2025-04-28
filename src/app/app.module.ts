import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/panel/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { AboutComponent } from './components/about/about.component';
import { SupportComponent } from './components/support/support.component';
import { Footer1Component } from './components/Template/footer1/footer1.component';
import { Menu1Component } from './components/Template/menu1/menu1.component';
import { HeaderComponent } from './components/Template/header/header.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardSidebarComponent} from "./components/Template/dashboard-sidebar/dashboard-sidebar.component";
import {DatePipe} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    AboutComponent,
    SupportComponent,
    Footer1Component,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    DashboardSidebarComponent,
    DashboardComponent,
    MatFormFieldModule,
    MatMenuModule,
    Menu1Component,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
