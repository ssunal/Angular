
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdunitService } from '../../adunit.service';
import { AdUnit } from '../index/AdUnit';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
message:string;
  angForm: FormGroup;
param:string="";
response: {};
adunit:AdUnit;

  constructor(
    private route: ActivatedRoute,
    private adunitservice: AdunitService,
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
setCookie(username) {
  // console.log(username);
 this.route.params.subscribe(params => {
this.adunitservice.setCookie(username);
this.newMessage(this.response);
console.log('set cookie servisinden dönen object:'+this.response);
});
}
getCookie() {
 this.route.params.subscribe(params => {
this.adunitservice.getCookie();
this.newMessage(this.response);
console.log('get cookie servisinden dönen object:'+this.response);
});
}

loginAdUnit(username, password) {

this.response=  this.adunitservice.loginAdUnit(username, password);
this.newMessage(this.response);
console.log('servisten dönen object:'+this.response);
// this.setCookie(username);
 this.router.navigate(['logined-in']);
}

//  if(this.b.length==0) {
//       console.log('uzunluğu boş'+ this.b.length);
//
// } else
// {  console.log(this.b.length);
// }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message)
this.data.currentLoginMessage.subscribe(message => this.message = 'login')
  }

  newMessage(username) {
    this.data.changeMessage("Please stop adblocker to use this system")
  }
  messageRemove() {
    this.data.changeMessage("")
  }
}
