import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AdunitService} from "../../adunit.service";
import {HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

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
    private cookieService: CookieService,
    private app: AppComponent,
    private route: ActivatedRoute,
    private data: AdunitService,
    private router: Router,
    private adunitservice: AdunitService
  ) {

  }


  ngOnInit() {
    let usr = this.cookieService.get('usr');
    let api_key = this.cookieService.get(usr);
    let user = this.cookieService.get('username');
    const params = new HttpParams()
      .set('service_key', 'profile')
      .set('API_KEY', api_key)
      .set('username',user)
      .set('session_user',user);

    this.adunitservice.profileGcc(params)
      .subscribe((res: JSON) => {
        console.log( res);
        this.json=res;
      });

  }

}
