import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { MwaHttpServiceService } from '../mwa-http-service.service';

import { NotificationService } from '../notification/notification-service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styles: ['']
})
export class UserCrudComponent implements OnInit {
  
  userList: any;

  constructor(private http: MwaHttpServiceService,private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.http.get('users').subscribe((data: any) => {
      console.log(data);
      if (data.status === 'SUCCESS')
        this.userList = data.data;
    });
  }

  onDelete(mail){

    this.notificationService.deleteResult.subscribe(data=>{
      if(data){
          this.notificationService.sendMessage('Deleted','success');
      }
      console.log('delete result : ' + data);
    }); 

   this.notificationService.deleteConfirmation();
  }

  onUpdate(user){

  }

}
