import { Component } from '@angular/core';
import { MwaHttpServiceService } from './mwa-http-service.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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

  constructor(http : MwaHttpServiceService,private formBuilder : FormBuilder){
    this.loginForm = formBuilder.group({
        'mail' : ['username'],
        'password' : ['password']
    });
  }

  onSubmit() : void {
    console.log(this.loginForm.value);
  }
  



}
