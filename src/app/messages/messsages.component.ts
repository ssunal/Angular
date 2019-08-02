
  import { Component, OnInit } from '@angular/core';
  import { AdunitService } from "../adunit.service";

  @Component({
    selector: 'app-messages',
    template: `
      {{message}}

    `
      // <button (click)="newMessage()">New Message</button>
  })
  export class MessagesComponent implements OnInit {

    message:string;



    constructor(private data: AdunitService) { }

    ngOnInit(): void {

      this.data.currentMessage.subscribe(message => this.message = message);
    //   import { CookieService } from 'ngx-cookie-service';
    //   constructor(
    //               private cookieService: CookieService
    //               ) { }
    // cookieValue = 'UNKNOWN';
    //   this.cookieService.set( 'Test', this.message );
    //   this.cookieValue = this.cookieService.get('Test');
    //   console.log(  this.cookieValue)
    }

    newMessage() {
      this.data.changeMessage("mesaj gönderildi")
    }

  }
