import { Component, OnInit } from '@angular/core';
import {MwaHttpServiceService} from '../../mwa-http-service.service';
import { map } from 'rxjs/operators';
import {forEach} from "@angular/router/src/utils/collection";
import {of} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // public entryList: {
  //     productid: string,
  //     productname: string,
  //     description: string,
  //     price: number
  //    }[] = new Array();

  // public entryList = new Array();
  public entryList: any;

  constructor(private productClient: MwaHttpServiceService) {
    this.productClient.get('/products')
      .subscribe(
      (response: JSON) => {
        //console.log(response[0]);

        // for(let i = 0; i < response.length; i++) {
        //   console.log(response[i]);
        //   this.entryList.push({
        //     productid: response[i].productid,
        //     productname: response[i].productname,
        //     description: response[i].description,
        //     price: response[i].price
        //   });
        // }
        //
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
