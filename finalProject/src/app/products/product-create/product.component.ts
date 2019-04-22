import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { MwaHttpServiceService } from '../../mwa-http-service.service';
import { Router } from '@angular/router';

//import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-root',
  templateUrl: './product.component.html',
  styles: []
})

export class ProductComponent implements OnInit {
   createProduct: FormGroup;

   constructor(private fb: FormBuilder, private service: MwaHttpServiceService, private router: Router) {
      this.createProduct = this.fb.group({
        'productid': ['', Validators.required],
        'productname': ['', Validators.required],
        'description': [''],
        'price': ['0', Validators.required]
      });
   };

   //public uploader: FileUploader = new FileUploader({url: '../assets/images', itemAlias: 'photo'});

   ngOnInit() {
    // this.uploader.onAfterAddingFile = (file) => {
    //   file.withCredentials = false;
    // };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   console.log('FileUpload:uploaded:', item, status, response);
    //   alert('File uploaded successfully');
    // };
   }

    onCreateProduct() {
      let body: any;
      body = {
        'productid': this.createProduct.get('productid').value,
        'productname': this.createProduct.get('productname').value,
        'description': this.createProduct.get('description').value,
        'adduser': 1,
        'price': this.createProduct.get('price').value,
        'postdate': new Date()
      };
      console.log('onCreateProduct');
      console.log(body);
      this.service.post('/products', body).subscribe(
        (err) => {console.log(err);},
        (result => {
          console.log(result);
        })
      );
      //this.router.navigate(['/products']);
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
