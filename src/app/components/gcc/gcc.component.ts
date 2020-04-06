import { Component, OnInit } from '@angular/core';
import {Posts} from "../../../../models/posts";
import {AppComponent} from "../../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AdunitService} from "../../adunit.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-gcc',
  templateUrl: './gcc.component.html',
  styleUrls: ['../../../../src/assets/css/style.css',
    '../../../../src/assets/css/font-awesome.css',
    '../../../../src/assets/css/materialize.min.css',
  '../../../../src/assets/css/responsive.css',
  '../../../../src/assets/css/animate.css',
  '../../../../src/css/base.css',
  '../../../../src/assets/css/variables.css',
  '../../../../src/assets/css/nav.css'
  ]
})
export class GccComponent implements OnInit {
json:JSON;
  constructor(
    private app: AppComponent,
    private route: ActivatedRoute,
    private data: AdunitService,
    private router: Router,
    private adunitservice: AdunitService
  ) {

  }


  ngOnInit() {

    const params = new HttpParams()
      .set('service_key', 'profile')
      .set('API_KEY', "23269130c087bf2322ede5484e4106bc")
      .set('username','ss')
      .set('session_user','ss');

    this.adunitservice.loginGcc(params)
      .subscribe((res: JSON) => {
        console.log( res);
        this.json=res;
      });

  }

}
