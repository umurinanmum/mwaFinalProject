import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {MwaHttpServiceService} from '../mwa-http-service.service';

import {Router} from '@angular/router';

import {NotificationService} from '../notification/notification-service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styles: ['']
})
export class UserCrudComponent implements OnInit {

  userList: any;


  constructor(private http: MwaHttpServiceService, private notificationService: NotificationService, private router: Router) {
  }


  ngOnInit(): void {
    this.http.get('users').subscribe((data: any) => {
      console.log(data);
      if (data.status === 'SUCCESS')
        this.userList = data.data;
    });
  }

  onDelete(id) {
    //console.log('delete called');
    this.notificationService.deleteResult.subscribe(data => {
      //console.log('callback called');
      if (data) {
        this.http.delete('users/' + id).subscribe((result: any) => {
          if (result.status === 'SUCCESS') {
            this.notificationService.sendMessage('Deleted', 'success');
            this.ngOnInit();
          }
        });
      }
    });
    this.notificationService.deleteConfirmation();
  }

  onUpdate(user) {

  }

}
