import {Component, OnInit} from '@angular/core';
import {DashboardSidebarComponent} from "../../Template/dashboard-sidebar/dashboard-sidebar.component";
import {AuthService} from "../../../services/auth.service";
import {ProfileService} from "../../../services/profile.service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {GoogleAuthService} from "../../../services/google-auth.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DashboardSidebarComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    MatProgressSpinner
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  profileform! : FormGroup;
  formData = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    city: "",
    address: "",
    postalCode: "",
    role: "",
    siteUrl: "",
    applicationName: "",
    clientId: "",
    clientSecret: "",
    googleRefreshToken: ""
  };
  protected flag_profile: boolean = false;
  public constructor(private auth:AuthService, private profile:ProfileService, private fb:FormBuilder, private toast:NgToastService, private router:Router, private google:GoogleAuthService) {
  }

  ngOnInit() {
    this.profile.getinfo().subscribe(response => {
      this.formData.firstName = response.firstName;
      this.formData.lastName = response.lastName;
      this.formData.userName = response.userName;
      this.formData.email = response.email;
      this.formData.phoneNumber = response.phoneNumber;
      this.formData.city = response.city;
      this.formData.address = response.address;
      this.formData.postalCode = response.postalCode;
      this.formData.role = response.role;
      this.formData.siteUrl = response.siteUrl;
      this.formData.applicationName = response.applicationName;
      this.formData.clientId = response.clientId;
      this.formData.clientSecret = response.clientSecret;
      this.formData.googleRefreshToken = response.googleRefreshToken;

      this.profileform.controls['firstName'].setValue(response.firstName);
      this.profileform.controls['lastName'].setValue(response.lastName);
      this.profileform.controls['userName'].setValue(response.userName);
      this.profileform.controls['email'].setValue(response.email);
      this.profileform.controls['phoneNumber'].setValue(response.phoneNumber);
      this.profileform.controls['city'].setValue(response.city);
      this.profileform.controls['address'].setValue(response.address);
      this.profileform.controls['postalCode'].setValue(response.postalCode);
      this.profileform.controls['role'].setValue(response.role);
      this.profileform.controls['siteUrl'].setValue(response.siteUrl);
      this.profileform.controls['applicationName'].setValue(response.applicationName);
      this.profileform.controls['clientId'].setValue(response.clientId);
      this.profileform.controls['clientSecret'].setValue(response.clientSecret);
      this.profileform.controls['googleRefreshToken'].setValue(response.googleRefreshToken);
      this.flag_profile = true;
    },error => {
      this.toast.error({detail:"ERROR",summary:"Can't Connect to the Server!",duration:5000, position:'topRight'})
    });

    this.profileform = this.fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      userName : ['', Validators.required],
      email : ['', Validators.required],
      phoneNumber : ['', Validators.required],
      city : [''],
      address : [''],
      postalCode : [''],
      role : [''],
      password : ['', Validators.required],
      siteUrl: [''],
      applicationName: [''],
      clientId: [''],
      clientSecret: [''],
      googleRefreshToken: ['']
    })
  }

  onUpdate(){
    if (this.profileform.valid){
      this.profile.useredit(this.profileform.value).subscribe({
        error:(res=>{
          if (res.status == 200){
            this.toast.success({detail:"SUCCESS",summary:res.error.text,duration:5000, position:'topRight'});
            this.router.navigate(['dashboard']);
          }
          else
            this.toast.error({detail:"ERROR",summary:res.error,duration:5000, position:'topRight'});
        })
      });
    }
    else {
      this.ValidateAllFormFields(this.profileform);
      this.toast.error({detail:"ERROR",summary:"Your Form Is Not Valid!",duration:5000, position:'topRight'});
    }

  }

  private ValidateAllFormFields(formgroup: FormGroup){
    Object.keys(formgroup.controls).forEach(field => {
      const control = formgroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({ onlySelf: true });
      } else if(control instanceof FormGroup){
        this.ValidateAllFormFields(control);
      }
    })
  }

  onGoogleLogin(){
    const auth_url = this.google.google_login(this.formData.clientId);
    window.location.href = auth_url;
  }
}

