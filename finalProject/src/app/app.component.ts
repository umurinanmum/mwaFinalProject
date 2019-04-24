import { Component, OnInit } from '@angular/core';
import { MwaHttpServiceService } from './mwa-http-service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from './notification/notification-service';

// <a [routerLink] = "['login']"> login </a>
// <a [routerLink] = "['register']"> register </a>


@Component({
  selector: 'app-root',
  template: `
 
  <app-notification></app-notification>

  <div class="container-fluid">
    <nav class="navbar navbar-inverse">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">PRODUCT REVIEW APP</a>
      </div>
      <ul class="nav navbar-nav">
        <li>
          <a routerLink="login" [ngStyle] = "{'visibility' : isVisible==='visible'  ? 'hidden' : 'visible'}"><b>Login</b></a>
        </li>
        <li>
          <a routerLink="register" [ngStyle] = "{'visibility' : isVisible==='visible'  ? 'hidden' : 'visible'}">Register New User</a>
        </li>
        <li>
          <a routerLink="users" [ngStyle] = "{'visibility' : isVisible }" >User List</a>
        </li>
        <li>
          <a routerLink="product/add" [ngStyle] = "{'visibility' : isVisible }">Create New Product</a>
        </li>
        <li>
          <a routerLink="products" [ngStyle] = "{'visibility' : isVisible }">Product List</a>
        </li>
        <li>
        <a (click) = "logoutClick()" [ngStyle] = "{'visibility' : isVisible }">Logout</a>
        </li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  </div>
  ` ,
  styles: []
})
export class AppComponent implements OnInit {

  isVisible: string = 'hidden';

  constructor(private notificationService: NotificationService,private router: Router) {
    this.notificationService.loginEvent.subscribe(dummy => {
      console.log('Login Event');
      this.isVisible = 'visible';
    });
  }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    if (token) {
      this.isVisible = 'visible';
    }
  }

  logoutClick(){
    localStorage.clear();
    this.isVisible = 'hidden';
    this.router.navigate(['login']);
  }


}
