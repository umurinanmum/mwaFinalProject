import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnDestroy } from '@angular/core';
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
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductComponent } from './products/product-create/product.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductCanDeactiveGuardService } from './products/product-can-deactive-guard.service';
import { AuthorizationGuard } from './AuthorizationGuard';
import{CommentsComponent} from './comments/comments.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const MWA_ROUTES : Routes = [
  { path: 'products', component: ProductListComponent,canActivate : [AuthorizationGuard]  },
  {
    path: 'product/add',
    component: ProductComponent,
    canDeactivate: [ProductCanDeactiveGuardService],canActivate : [AuthorizationGuard]
  },
  {
    path: 'product/edit/:productid',
    component: ProductEditComponent,canActivate : [AuthorizationGuard]
  },
  { path: 'products/:productid', component: ProductDetailsComponent,canActivate : [AuthorizationGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserCrudComponent,canActivate : [AuthorizationGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent, ProductComponent, RegisterComponent, LoginComponent,
    NotificationComponent, UserCrudComponent, ProductListComponent, ProductDetailsComponent, ProductEditComponent, CommentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(MWA_ROUTES),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ProductCanDeactiveGuardService,
    AuthorizationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
