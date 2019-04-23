import { Component, OnInit } from '@angular/core';
import { MwaHttpServiceService } from './mwa-http-service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
          <a routerLink="login"><b>Login</b></a>
        </li>
        <li>
          <a routerLink="register">Register New User</a>
        </li>
        <li>
          <a routerLink="users" [style.visiblity]>User List</a>
        </li>
        <li>
          <a routerLink="product/add">Create New Product</a>
        </li>
        <li>
          <a routerLink="products">Product List</a>
        </li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  </div>
  ` ,
  styles: []
})
export class AppComponent implements OnInit {

  isVisible: boolean = false;

  constructor() {

  }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    if (token) {
      this.isVisible = true;
    }
  }



}
