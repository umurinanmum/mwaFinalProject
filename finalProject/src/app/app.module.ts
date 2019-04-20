import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component'; 
import { TokenInterceptor } from './token-interceptor';

import {Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { ProductComponent } from 'src/product/product.component';
import { RegisterComponent } from './register.component'; 


const MWA_ROUTES = [
    {path:'products', component: ProductComponent},
    {path:'register', component: RegisterComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,ProductComponent, RegisterComponent
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
