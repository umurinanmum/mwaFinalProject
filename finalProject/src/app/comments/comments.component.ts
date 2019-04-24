import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators,NgForm  } from '@angular/forms';
import { MwaHttpServiceService } from '../mwa-http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../notification/notification-service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  createComments: FormGroup;
  entryList: JSON;
  service:any;
  user = JSON.parse(localStorage.getItem('user'));
  currentRate=0;
  //@Input() pid:string;
  public pid:string;
  constructor(private fb: FormBuilder, private http: MwaHttpServiceService, private router: ActivatedRoute, 
    private notificationService: NotificationService) {
    // console.log(this.pid);
     this.service=http;
     this.createComments = this.fb.group({
       'reviewHeadline': ['', Validators.required],
       'comment': ['', Validators.required]
     });
    
     
  };
  
  onCreateComment() {
    let body: any;
    
    console.log("printing:"+this.user.firstName);
    var username = this.user.firstName;
    body = {
      'productid':this.pid,
      'headline':this.createComments.get('reviewHeadline').value,
      'review': this.createComments.get('comment').value,
      'username':username,
      'raiting':this.currentRate,
      'postdate': new Date()
    };
   // console.log('onCreateComments');
    console.log(body);
  
    this.http.post('comments', body).subscribe(
      
      (result => {
        console.log(result);
        this.notificationService.sendMessage('Review Submitted!','success');
        this.ngOnInit();
        this.createComments.reset();
        this.currentRate=0;
      })
    );
    //this.router.navigate(['products']);
  };
  onDeleteComments(reviewid){
    console.log('onDeleteProduct: ' + reviewid);
    this.notificationService.deleteResult.subscribe(data => {
      if (data) {
        this.http.delete('comments/' + reviewid).subscribe(
          result => {
            console.log('deleted');
            this.notificationService.sendMessage('Deleted', 'success');
            this.ngOnInit();
          },
          err => {
            console.log(err);
            this.notificationService.sendMessage(err.toString(), 'error');
          }
        );
      }
    });
    this.notificationService.deleteConfirmation();
     
  }
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
