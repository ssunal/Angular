import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AdunitService} from "../../adunit.service";
import {HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {strictEqual} from "assert";
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
  json:{mobile:string,phone_number:string};
  user:{
    email: any;
    phone_number: any;
    mobile: any;
    c_profile:{profile: any;};};
  username:string;
  usertitle:string;
  uri:string;
  skills:[];
  private trustedDashboardUrl : SafeUrl;
  private titles: [{jobtitle: string}];
  private title: string;
  constructor(
    private sanitizer: DomSanitizer,
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
      .subscribe((res: any) => {

        //this.json=res;
        this.json=res.user;
        this.user=res.user;
        this.username=res.user.name;
        this.usertitle=res.user.title;
        this.skills=res.user.skills.skill;
        this.titles=res.user.titles.title;
        this.title='';
        for (let key in this.titles) {
            console.log ('key: ' +  key + ',  value: ' + this.titles[key].jobtitle);
            this.title=this.title+','+this.titles[key].jobtitle;
          }
        //console.log( this.titles);
        this.trustedDashboardUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl
          (this.user.c_profile.profile[0].url1);
           this.uri=standardEncoding(this.user.c_profile.profile[0].url1);
      });

  }

}
function standardEncoding(v: string): string {
  return decodeURIComponent(v).replace(/&#47;/gi, '/');
}
