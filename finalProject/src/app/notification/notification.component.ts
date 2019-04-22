import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from './notification-service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-notification',
  template: `
  
  
  
  `,
  styles: []
})
export class NotificationComponent implements OnInit {

  content: string;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.send.subscribe(data => {
      Swal.fire('', data.message, data.type);
    });
  }



}
