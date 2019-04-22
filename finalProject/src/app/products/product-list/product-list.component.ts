import { Component, OnInit } from '@angular/core';
import { MwaHttpServiceService } from '../../mwa-http-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  entryList: any;

  constructor(private productClient: MwaHttpServiceService) {

    this.productClient.get('/products')
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

}
