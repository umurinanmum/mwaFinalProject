import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MwaHttpServiceService } from './mwa-http-service.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification/notification-service';

@Component({
  selector: 'app-login',
  templateUrl: './login-component.html',
  styles: []
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private http: MwaHttpServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService : NotificationService) {

    this.loginForm = formBuilder.group({
      'mail': ['umurinan@gmail.com', Validators.compose([Validators.required, Validators.email])],
      'password': ['123456']
    });
  }

  onSubmit(): void {
    this.http.post('users/login', this.loginForm.value).subscribe((result: any) => {
      if (result.status === 'SUCCESS') {
        localStorage.setItem('token', result.data);
      } else {
        this.notificationService.sendMessage('Login Failed','error');
      }
    });
    //this.router.navigate(['products']);
  }

  onRegister(): void {
    this.router.navigate(['register']);
  }

}
