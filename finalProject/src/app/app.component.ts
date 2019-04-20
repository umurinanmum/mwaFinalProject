import { Component } from '@angular/core';
import { MwaHttpServiceService } from './mwa-http-service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// <a [routerLink] = "['login']"> login </a>
// <a [routerLink] = "['register']"> register </a>


@Component({
  selector: 'app-root',
  template: `
 
  
  <router-outlet>
  
  </router-outlet>
  ` ,
  styles: []
})
export class AppComponent {




}
