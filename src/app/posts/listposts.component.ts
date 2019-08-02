import { Component, OnInit } from '@angular/core';
import { Posts } from '../../../models/posts';
import { AdunitService } from './../adunit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from "./../app.component";

@Component({
  selector: 'app-listposts',
  templateUrl: './listposts.component.html',
  styleUrls: ['./listposts.component.css']
})
export class ListpostsComponent implements OnInit {
  postss: Posts[];
  result: string;
  constructor(
      private app: AppComponent,
      private route: ActivatedRoute,
      private data: AdunitService,
      private router: Router,
      private adunitservice: AdunitService
  ) {

  }
  isMobile = false;
  addStyles(){
    let styles = {

      'color':this.isMobile ? 'green' : 'black',

    };
    return styles;
  }
  ngOnInit() {
   // this.adunitservice.isLogin(this.app);

    this.adunitservice.apiChippers(this.app.cookieValue,'VyRghZo5CmTU4uIocL4G')
       .subscribe((data: Posts[]) => {
         console.log('posts function çalışacak servise gidiyor');
         this.postss = data;
       });

    console.log('dönnen:'+JSON.stringify(this.result));
  }

}
