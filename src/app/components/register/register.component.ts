import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerform!: FormGroup;
  constructor(private fb: FormBuilder,private auth:AuthService, private router:Router, private toast:NgToastService){}

  ngOnInit(): void {
    this.registerform = this.fb.group({
      username : ['', Validators.required],
      email : ['', Validators.required],
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  onRegister(){
    if(this.registerform.valid){
      this.auth.register(this.registerform.value)
      .subscribe(
        (response) => {
          this.auth.login(this.registerform.value).subscribe({
            next:(res=>{
              this.auth.storeToken(res.token);
              this.router.navigate(['dashboard'])})});
          this.registerform.reset();
          this.toast.success({detail:"SUCCESS",summary:response.message,duration:5000, position:'topRight'});
        },
        (error) => {
          if(error.status == 200){
            this.auth.login(this.registerform.value).subscribe({
              next:(res=>{
                this.auth.storeToken(res.token);
                this.router.navigate(['dashboard'])})});
            this.registerform.reset();
            this.toast.success({detail:"SUCCESS",summary:error.error.text,duration:5000, position:'topRight'});
          }
          else{
            this.toast.error({detail:"ERROR",summary:error.error,duration:5000, position:'topRight'});
          }
      });

    } else {
      this.ValidateAllFormFields(this.registerform);
      this.toast.error({detail:"ERROR",summary:"Form Is Not Valid!",duration:5000, position:'topRight'});
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
}
