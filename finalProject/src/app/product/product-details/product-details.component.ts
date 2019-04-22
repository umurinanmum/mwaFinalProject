import { Component, OnInit } from '@angular/core';
import {MwaHttpServiceService} from '../../mwa-http-service.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  //productDetails: any;

  productDetails: Product = {
    productid: null,
    productname: null,
    description?: null,
    postdate: null,
    adduser: null,
    price: null,
    photopath?: ''
  };

  constructor(private productClient: MwaHttpServiceService, private route: ActivatedRoute) {
    this.route.params.subscribe(p => {

      this.productClient.get('/products/' + p['productid']).subscribe(
        data => { this.productDetails = data; },
        err => { console.log(err); }
      );

    } );

  }

  ngOnInit() {
  }

}
