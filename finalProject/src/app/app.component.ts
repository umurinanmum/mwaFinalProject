import { Component } from '@angular/core';
import { MwaHttpServiceService } from './mwa-http-service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// <a [routerLink] = "['login']"> login </a>
// <a [routerLink] = "['register']"> register </a>


@Component({
  selector: 'app-root',
  template: `

    <div class="container">
      <nav class="navbar navbar-default">
        <ul class="nav navbar-nav">
          <li>
            <a routerLink="login"><b>Login</b></a>
          </li>
          <li>
            <a routerLink="register">Register New User</a>
          </li>
          <li>
            <a routerLink="products">List Products</a>
          </li>
          <li>
            <a routerLink="product/add">Create New Product</a>
          </li>
        </ul>
      </nav>
      <router-outlet></router-outlet>
    </div>
  ` ,
  styles: []
})

export class AppComponent {

}
