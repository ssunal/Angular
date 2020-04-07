
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdunitService } from '../../adunit.service';
import { AdUnit } from '../index/AdUnit';
import { AppComponent } from "../../app.component";
import {Uspass} from '../../../../models/uspass';
import {HttpParams} from "@angular/common/http";
import {Md5} from 'ts-md5/dist/md5';
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-login',
  templateUrl: './logingcc.component.html',
  styleUrls: ['./logingcc.component.css']
})
export class LoginGccComponent implements OnInit {
message:string;

  messageUsername:string;
  pageName:string;
   returnObject:string='abc';
  angForm: FormGroup;
params:string="";
response: {};
adunit:AdUnit;
  private json: JSON;
  private jsonRes: boolean;
  private rand_key:string='gMvxQgEGG3K8iGY';
  //private cookieService: any;

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private adunitservice: AdunitService,
    private uspass: Uspass,
    private app: AppComponent,
    private data: AdunitService,
    private router: Router,
    private fb: FormBuilder) {
    this.createForm();
    this.messageRemove();

  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['',Validators.required ]
   });
  }
//setCookie(username) {
  // console.log(username);
// this.route.params.subscribe(params => {
//this.adunitservice.setCookie(username);
//this.newMessage(this.response);
//console.log('set cookie servisinden dönen object:'+this.response);
//});
//}
//getCookie() {
// this.route.params.subscribe(params => {
//   this.response=this.adunitservice.getCookie();
//this.newMessage(this.response);
//console.log('get cookie servisinden dönen object:'+this.response);
//});
//}

setLogin(username, password) {

this.response=  this.adunitservice.firstLogin(username, password,this.app);
  console.log('login.componenete girdi:'+this.adunitservice.currentLoginMessage)
this.returnObject='xyz';
this.newMessage(this.response);
// this.newPageName(this.pageName);

}
login(username, password){
    this.uspass.username=username;
    this.uspass.password=password;
  this.uspass.auth_token='';
let uri='/api';
   this.adunitservice.apiChippersLogin(this.uspass,uri)
     .subscribe((uspass: Uspass) => {
       console.log('posts function çalışacak servise gidiyor');

       console.log(uspass);
       if(!uspass.islogin){
         this.message='username or password is incorrect';
       } else {
         this.app.login='logout';
         this.router.navigate(['logged-in']);
       }

     });
}
loginGcc(username,password){
    // @ts-ignore
  this.json={"users":[{"username":username,"password":password}]};

  let a=JSON.stringify(this.json);



  const params = new HttpParams()
    .set('service_key', 'login')
    .set('API_KEY', "08ae40b0f9877f43e78f1c589bfaff30")
    .set("username",username)
    .set('password',password)
    .set('json',a);

  this.adunitservice.loginGcc(params)
    .subscribe((res: any) => {
      console.log( res.return[0].returncode)
      if (res.return[0].returncode){
      const md5 = new Md5();
      let x='usr_'+md5.appendStr(this.rand_key).end();
      let usr = x.substring(0, 14);
      console.log(usr);
      //console.log(res.return[0].message.name_of_nick)
      //this.jsonRes=res.return[0].message;
      //console.log(this.jsonRes.hasOwnProperty(usr));
      for (let key in res.return[0].message) {
        if(key==usr){
        console.log ('key: ' +  key + ',  value: ' + res.return[0].message[key]);
        let v=res.return[0].message[key]
          this.cookieService.set( key, v );
          this.cookieService.set( 'usr', key );
          this.cookieService.set( 'username', username );
      }}
      this.router.navigate(['gcc']);}
  // return res;
      //this.adunitservice.setCookie(res.return[0].returncode);
    });
 // console.log('ufuk'+this.jsonRes);

}
  ngOnInit() {
    this.adunitservice.isLogin(this.app);
    this.data.currentMessage.subscribe(message => this.message = message)
    console.log(this.message);
    this.data.currentUsernameMessage.subscribe(username => this.messageUsername = username)

    this.data.currentPageMessage.subscribe(pageName => this.pageName = pageName)

  }

  newMessage(string) {

    this.data.changeMessage(string)
  }

  messageRemove() {
    this.data.changeMessage("")
  }
}
