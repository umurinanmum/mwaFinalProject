import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TokenInterceptor } from './token-interceptor';

import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductComponent } from 'src/app/product/product-create/product.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { ProductListComponent } from "./product/product-list/product-list.component";
import {ProductDetailsComponent} from "./product/product-details/product-details.component";

const MWA_ROUTES = [
  { path: 'products', component: ProductListComponent },
  { path: 'product/add', component: ProductComponent },
  { path: 'products/:productid', component: ProductDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent, ProductComponent, RegisterComponent, LoginComponent, ProductListComponent, ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(MWA_ROUTES),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
