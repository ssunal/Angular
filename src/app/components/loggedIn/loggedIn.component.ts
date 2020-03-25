


  import { Component, OnInit } from '@angular/core';

  import { Router } from '@angular/router';

  import {MatDialog} from "@angular/material/dialog";
  import {ModalComponent} from "../../modal/modal.component";
  import {AdunitService} from "../../adunit.service";
  @Component({
    selector: 'app-logged-In',
    // templateUrl:"<h1>{{welcome}} </h1>"
    templateUrl: './loggedIn.component.html'
      // <button (click)="newMessage()">New Message</button>
  })
  export class LoggedInComponent implements OnInit {
welcomeHome:string="You are logged in";
    message:string;
    email: string;
    shouldRun: any;
    side: string='over';
    hasbackdrop: string='over';
    constructor(public dialog: MatDialog,private data: AdunitService,private router:  Router) { }

    ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message)
    }

    newMessage() {
      this.data.changeMessage("mesaj gönderildi")
    }
    onChange():void{

      this.router.navigate(['login']);
    }
    openDialog(): void {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '350px',
        height: '550px',
        data: {email:this.email,side:this.side,hasbackdrop:this.hasbackdrop}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.email = result.email;
        this.side = result.side;
        this.hasbackdrop = result.hasbackdrop;
      });
    }
  }
