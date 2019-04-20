import { Component } from '@angular/core';
import { MwaHttpServiceService } from './mwa-http-service.service';

@Component({
  selector: 'app-root',
  template: `<div>umur</div>`,
  styles: []
})
export class AppComponent {
  title = 'finalProject';

  constructor(http : MwaHttpServiceService){
    http.get('?results=10').subscribe(data =>{console.log(data)});
  }



}
