import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MwaHttpServiceService } from '../mwa-http-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  createComments: FormGroup;
  entryList: JSON;
  service:any
  //@Input() pid:string;
  public pid:string;
  constructor(private fb: FormBuilder, private http: MwaHttpServiceService, private router: ActivatedRoute) {
    // console.log(this.pid);
     this.service=http;
     this.createComments = this.fb.group({
       'reviewHeadline': ['', Validators.required],
       'comment': ['', Validators.required]
      
     });
     
     
  };
  
  onCreateComment() {
    let body: any;
    var user = localStorage.getItem('user');
    console.log('user =====' +user);
    body = {
      'productid':this.pid,
      'headline':this.createComments.get('reviewHeadline').value,
      'review': this.createComments.get('comment').value,
      'username':"chinmoy",
      'raiting':4,
      'postdate': new Date()
    };
    console.log('onCreateComments');
    console.log(body);
    this.http.post('comments', body).subscribe(
      (err) => {console.log(err);},
      (result => {
        console.log(result);
       
      })
    );
    //this.router.navigate(['products']);
  };
  ngOnInit() {
   
    this.router.params.subscribe(p => {
      this.pid=p['productid'];
      console.log("response fetch"+this.pid);
      this.http.get('comments/'+this.pid)
         .subscribe(
         (response: JSON) => {
           console.log('data ' + response);
           this.entryList = response;
        //   console.log("response fetch"+this.pid);
           console.log(response);
           console.log("response end");
         },
         (error) => {
           console.log('Error occurred while retrieving product data from api');
           console.log(error);
         }
       );
      
     } );
 
  }

}
