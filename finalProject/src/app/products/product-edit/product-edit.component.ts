import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MwaHttpServiceService} from '../../mwa-http-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../notification/notification-service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @Input() product: Product;

  //public editProduct: FormGroup;
  productDetails: FormGroup;

  constructor(private fb: FormBuilder, private service: MwaHttpServiceService,
              private router: Router, private notificationService: NotificationService,
              private route: ActivatedRoute) {


    this.productDetails = this.fb.group({
      'productid': ['1', Validators.required],
      'productname': ['', Validators.required],
      'description': [''],
      'price': ['0', Validators.required]
    });

  };

  ngOnInit() {
    this.route.paramMap.subscribe(
      p => {
        const productid = +p.get('productid');
        this.service.get('products/' + productid).subscribe(
          (data: JSON) => {
            this.productDetails = data;
            //console.log(data);
          },
          err => {
            console.log(err);
          }
        );

      });
  }

  onEditProduct() {
    let body: any;
    body = {
      'productid': this.productDetails.get('productid').value,
      'productname': this.productDetails.get('productname').value,
      'description': this.productDetails.get('description').value,
      'status': true,
      'price': this.productDetails.get('price').value
    };

    console.log('onEditProduct');
    console.log(body);
    this.service.put('products', body).subscribe(
      (result) => {
        this.notificationService.sendMessage(result.toString(), 'success');
        console.log(result);
      },
      (err) => {
        this.notificationService.sendMessage(err.toString(), 'error');
        //this.router.navigate(['products']);
        console.log(err);
      }
    );
    //this.router.navigate(['products']);
  };
}
