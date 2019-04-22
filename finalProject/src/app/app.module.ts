import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TokenInterceptor } from './token-interceptor';

import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { NotificationComponent } from './notification/notification.component';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import {ProductDetailsComponent} from './products/product-details/product-details.component';
import {ProductComponent} from './products/product-create/product.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';

const MWA_ROUTES = [
  { path: 'products', component: ProductListComponent },
  { path: 'product/add', component: ProductComponent },
  { path: 'product/edit', component: ProductEditComponent },
  { path: 'products/:productid', component: ProductDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserCrudComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent, ProductComponent, RegisterComponent, LoginComponent,
    NotificationComponent, UserCrudComponent, ProductListComponent, ProductDetailsComponent, ProductEditComponent
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
