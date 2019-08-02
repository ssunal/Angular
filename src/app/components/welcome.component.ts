


  import { Component, OnInit } from '@angular/core';
  import { AdunitService } from "../adunit.service";


  @Component({
    selector: 'app-welcome',
    template:"<h1>{{welcome}} </h1>"
    // templateUrl: './welcome.component.html'
      // <button (click)="newMessage()">New Message</button>
  })
  export class WelcomeComponent implements OnInit {
welcome:string="Welcome to Chippers Angular 6 Project";
    message:string;
      login:string ='ooşlkşl';
      cookieValue:string ='UNKNOWN';

    constructor(private data: AdunitService) { }

    ngOnInit() {

      this.data.currentMessage.subscribe(message => this.message = message)

        console.log('app componentte cookie uzunluğu '+this.cookieValue);

    }

    newMessage() {
      this.data.changeMessage("mesaj gönderildi")
    }

  }
