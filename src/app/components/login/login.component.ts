
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdunitService } from '../../adunit.service';
import { AdUnit } from '../index/AdUnit';
import { AppComponent } from "../../app.component";
//import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
message:string;

  messageUsername:string;
  pageName:string;
   returnObject:string='abc';
  angForm: FormGroup;
params:string="";
response: {};
adunit:AdUnit;

  constructor(
    private route: ActivatedRoute,
    private adunitservice: AdunitService,
    //private cookieservice: CookieService,
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

  ngOnInit() {

    this.data.currentMessage.subscribe(message => this.message = message)
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
