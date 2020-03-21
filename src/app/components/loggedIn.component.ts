


  import { Component, OnInit } from '@angular/core';
  import { AdunitService } from "../adunit.service";
  import { ActivatedRoute, Router } from '@angular/router';
  @Component({
    selector: 'app-logged-In',
    // templateUrl:"<h1>{{welcome}} </h1>"
    templateUrl: './loggedIn.component.html'
      // <button (click)="newMessage()">New Message</button>
  })
  export class LoggedInComponent implements OnInit {
welcomeHome:string="You are logged in";
    message:string;

    constructor(private data: AdunitService,private router:  Router) { }

    ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message)
    }

    newMessage() {
      this.data.changeMessage("mesaj gönderildi")
    }
    onChange():void{

      this.router.navigate(['login']);
    }
  }
