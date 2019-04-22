import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MwaHttpServiceService } from './mwa-http-service.service';
import { NotificationService } from './notification/notification-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private http: MwaHttpServiceService, private formBuilder: FormBuilder, private notificationService : NotificationService) {
    this.registerForm = formBuilder.group({
      'mail': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required,this.passwordValidator])],
      'firstName': [''],
      'lastName': [''],
    });

    this.registerForm.statusChanges.subscribe(data => { console.log(data) });
  }

  onSubmit(): void {
    this.http.post('users/register',this.registerForm.value).subscribe((result: any) =>{
      if(result.status === 'SUCCESS'){
        this.notificationService.sendMessage('Congrats','success');
      }else{
        this.notificationService.sendMessage(result.status,'error');
      }
      console.log(result);
    });

    console.log(this.registerForm.value);
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value.length <6) {
      return { 'invalid': true };
    }
    return null;
  }

}
