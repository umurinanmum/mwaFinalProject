import { Component, OnInit } from '@angular/core';
import { MwaHttpServiceService } from '../../mwa-http-service.service';
import {Router} from "@angular/router";
import {NotificationService} from "../../notification/notification-service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  entryList: any;

  constructor(private http: MwaHttpServiceService, private router: Router, private notificationService: NotificationService) {

    this.http.get('products')
      .subscribe(
      (response: JSON) => {

        this.entryList = response;
      },
      (error) => {
        console.log('Error occurred while retrieving product data from api');
        console.log(error);
      }

    );
  }

  ngOnInit() {

  }


  onEditProduct(productid) {
    console.log('onEditProduct: ' + productid);
  };

  onDeleteProduct(productid) {

    console.log('onDeleteProduct: ' + productid);

    this.notificationService.deleteResult.subscribe(data => {
      if (data) {
        this.http.delete('products/' + productid).subscribe(
          result => {
            console.log('deleted');
            this.notificationService.sendMessage('Deleted', 'success');
          },
          err => {
            console.log(err);
            this.notificationService.sendMessage(err.toString(), 'error');
          }
        );
      }
    });
    this.notificationService.deleteConfirmation();
  };

}
