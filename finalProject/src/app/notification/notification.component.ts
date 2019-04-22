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

    this.notificationService.delete.subscribe(() => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        this.notificationService.deleteResultBack(result.value);
      })
    });

  }
}
