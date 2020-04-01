import { Component, OnInit } from '@angular/core';
import { AdUnit } from './AdUnit';
import { AdunitService } from '../../adunit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from "../../app.component";
import {EditRecordComponent} from "../windows/editrecord/editrecord.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  adunits: AdUnit[];
  message:string;

  id:number;
  private username: string;
  private email: string;
  private id_user: number;

  constructor(
    public dialog: MatDialog,
      private app: AppComponent,
      private route: ActivatedRoute,
      private data: AdunitService,
      private router: Router,
    private adunitservice: AdunitService

  ) {

  }
    isMobile = false;
    addStyles(){
      let styles = {

        'color':this.isMobile ? 'green' : 'black',

      };
      return styles;
    }
  ngOnInit() {

    this.adunitservice.isLogin(this.app);
   //let response=this.adunitservice.apiChippers('sinek','VyRghZo5CmTU4uIocL4G');
    //console.log(response);

    this.adunitservice
      .indexAdUnits()
      .subscribe((data: AdUnit[]) => {
        console.log('index function çalışacak servise gidiyor');
      this.adunits = data;
    });
      this.data.currentMessage.subscribe(message => this.message = message)
  }
  deleteAdUnit(id_user) {
    let id=id_user;
      console.log('delete function çalışacak servise gidiyor'+id_user);
    this.route.params.subscribe(params => {
       this.adunitservice.deleteAdUnit(id_user);
console.log(id_user+' Deleted');

    });
      this.deleteMessage(id_user);
//this.router.navigate(['messages']);
    this.ngOnInit();
    //
    //   this.adunitservice.deleteAdUnit(id_user);
    //
    //


  }

  deleteMessage(id_user) {
    this.data.changeMessage(id_user+" numaralı veri Silindi..")
  }
  messageRemove() {
    this.data.changeMessage("")
  }
  openDialog(username,email,id_user): void {
    const dialogRef = this.dialog.open(EditRecordComponent, {
      width: '350px',
      height: '550px',
      data: {username: username, email: email,id_user: id_user}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    /*  this.email = result.email;
      this.username = result.username;
      this.id_user = result.id_user;*/
    });
  }

}
