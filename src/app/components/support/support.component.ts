import { Component } from '@angular/core';
import emailjs, {EmailJSResponseStatus, send} from '@emailjs/browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  contactform!:FormGroup;
  constructor(private fb:FormBuilder,private toast:NgToastService) {}

  ngOnInit(): void {
    this.contactform = this.fb.group({
      subject : ['', Validators.required],
      tel : ['', Validators.required],
      name : ['', Validators.required],
      email : ['', Validators.required],
      text : ['', Validators.required],
    })
  }

  async send(){
    if(this.contactform.valid){
      emailjs.init('LJ2ENj7qErcphFqsb')
      let response = await emailjs.send("service_7r16eq9","template_1qfw6zo",this.contactform.value);
      this.toast.success({detail:"SUCCESS",summary:"Contact Message Send!",duration:5000, position:'topRight'});
      this.ngOnInit();
    }
    else {
      this.ValidateAllFormFields(this.contactform);
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
}
