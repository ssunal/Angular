


  import { Component, OnInit } from '@angular/core';
  import { AdunitService } from "./adunit.service";

  @Component({
    selector: 'app-loged-In',
    // templateUrl:"<h1>{{welcome}} </h1>"
    templateUrl: './loggedIn.component.html'
      // <button (click)="newMessage()">New Message</button>
  })
  export class LoggedInComponent implements OnInit {
welcomeHome:string="You are logged in";
    message:string;

    constructor(private data: AdunitService) { }

    ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message)
    }

    newMessage() {
      this.data.changeMessage("mesaj gönderildi")
    }

  }
