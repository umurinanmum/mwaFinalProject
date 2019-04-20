import { Component } from '@angular/core';
import { MwaHttpServiceService } from './mwa-http-service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// <div>Dummy Form</div>
//   <a [routerLink] = "['products']"> PRODUCTS </a>

@Component({
  selector: 'app-root',
  template: `
  <a [routerLink] = "['login']"> login </a>
  <a [routerLink] = "['register']"> register </a>
  
  <router-outlet>
  
  </router-outlet>
  ` ,
  styles: []
})
export class AppComponent {




}
