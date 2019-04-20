import { Component } from '@angular/core';
import { MwaHttpServiceService } from './mwa-http-service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// `
//   <div>Login Form</div>
//   <a [routerLink] = "['products']"> PRODUCTS </a>
  
//   <router-outlet></router-outlet>
//   `,

@Component({
  selector: 'app-root',
  templateUrl: 'login.html' ,
  styles: []
})
export class AppComponent {
  
  loginForm : FormGroup;

  constructor(http : MwaHttpServiceService,private formBuilder : FormBuilder,private router : Router){
    this.loginForm = formBuilder.group({
        'mail' : ['',Validators.compose([Validators.required,Validators.email])],
        'password' : ['']
    });
  }

  onSubmit() : void {
    console.log(this.loginForm.value);
  }

  onRegister() : void {
    this.router.navigate(['register']);
  }
  



}
