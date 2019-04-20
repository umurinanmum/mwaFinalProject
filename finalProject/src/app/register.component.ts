import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MwaHttpServiceService } from './mwa-http-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(http: MwaHttpServiceService, private formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      'mail': ['', Validators.compose([Validators.required, Validators.email])],
      'password': [''],
      'firstName': [''],
      'lastName': [''],
    });
  }

  onSubmit(): void {
    console.log(this.registerForm.value);
  }

}
