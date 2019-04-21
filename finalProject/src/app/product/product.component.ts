import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { MwaHttpServiceService } from '../mwa-http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './product.component.html',
  styles: []
})

export class ProductComponent {
  createProduct: FormGroup;
   pricePattern = '/^\d+\.\d{0,2}$/';

   constructor(private fb: FormBuilder, private service: MwaHttpServiceService) {
      this.createProduct = this.fb.group({
        'productid': ['', Validators.required],
        'productname': ['', Validators.required],
        'description': [''],
        'price': ['0', Validators.compose([Validators.required, Validators.pattern(this.pricePattern)])]
      });
   };


    onCreateProduct() {
      console.log('onCreateProduct');
      let body = "test";
      // body = {
      //   'productid': this.createProduct.get('productid').value,
      //   'productname': this.createProduct.get('productname').value,
      //   'description': this.createProduct.get('description').value,
      //   'price': this.createProduct.get('price').value
      // };
      console.log(body);
      this.service.post('/products', body);
    };

    onEditProduct() {
      console.log('onEditProduct');
    };

    onDeleteProduct() {
      console.log('onDeleteProduct');
    };

    // validatePrice(control: FormControl): {[s: string]: boolean} {
    //   //if(control.value)
    //
    //   return true;
    // };


}
