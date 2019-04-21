import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MwaHttpServiceService } from './mwa-http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-component.html',
  styles: []
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(http: MwaHttpServiceService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      'mail': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['']
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    //this.router.navigate(['products']);
  }

  onRegister(): void {
    this.router.navigate(['register']);
  }

}
