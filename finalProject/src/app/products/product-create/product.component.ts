import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators} from '@angular/forms';
import {MwaHttpServiceService} from '../../mwa-http-service.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../notification/notification-service';

@Component({
  selector: 'app-root',
  templateUrl: './product.component.html',
  styles: []
})

export class ProductComponent implements OnInit {

  createProduct: FormGroup;

  constructor(private fb: FormBuilder, private service: MwaHttpServiceService,
              private router: Router, private notificationService: NotificationService) {
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
      'status': true,
      'price': this.createProduct.get('price').value,
      'postdate': new Date()
    };
    console.log('onCreateProduct');
    console.log(body);
    this.service.post('products', body).subscribe(
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


  // validatePrice(control: FormControl): {[s: string]: boolean} {
  //   //if(control.value)
  //
  //   return true;
  // };


}
