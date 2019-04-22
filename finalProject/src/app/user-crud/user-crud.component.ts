import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { MwaHttpServiceService } from '../mwa-http-service.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styles: ['']
})
export class UserCrudComponent implements OnInit {
  
  userList: any;

  constructor(private http: MwaHttpServiceService) { }

  ngOnInit(): void {
    this.http.get('users').subscribe((data: any) => {
      console.log(data);
      if (data.status === 'SUCCESS')
        this.userList = data.data;
    });
  }

}
