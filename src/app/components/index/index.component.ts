import { Component, OnInit } from '@angular/core';
import { AdUnit } from './AdUnit';
import { AdunitService } from '../../adunit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from "../../app.component";
import {EditRecordComponent} from "../windows/editrecord/editrecord.component";
import {MatDialog} from "@angular/material/dialog";
import {SearchrecordComponent} from "../windows/searchrecords/searchrecord.component";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css','../../../assets/css/font-awesome.css']
})
export class IndexComponent implements OnInit {

  adunits: AdUnit[];
  message: string;
  user: string = '*all';
  id: number;
  /*private username: string;
  private email: string;
  private id_user: number;*/
  search: string;
  length: number;
  array:AdUnit[];
  count1:number=0;
  count2:number=2;
  //array:any = [];
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

  addStyles() {
    let styles = {

      'color': this.isMobile ? 'green' : 'black',

    };
    return styles;
  }

  searchAccount(search) {
    if (search == null || search == '') {
      this.user = '*all';
    } else {
      this.user = search;
    }

    console.log(search)
    this.ngOnInit();
  }
next(){
  this.count2=this.count2+2;
this.count1=this.count1+2;
this.ngOnInit();
}
  previous(){
    if (this.count1!=0) {
    this.count2=this.count2-2;
    this.count1=this.count1-2;
    this.ngOnInit();
  }}
  ngOnInit() {
    this.adunitservice.isLogin(this.app);
    //let response=this.adunitservice.apiChippers('sinek','VyRghZo5CmTU4uIocL4G');
    //console.log(response);

    this.adunitservice
      .searchAdUnit(this.user)
      .subscribe((data: AdUnit[]) => {
        console.log('index function çalışacak servise gidiyor');
        this.adunits = data;
        this.length=data.length;
        let i=0;
        let k=this.count1;
        let j=this.count1+2;
        let arr:any=[];
          data.forEach(function AdUnit (value) {
            //this.array.push(value);

            if(k<=i && i<j) {
              console.log(i)
              arr.push(value)
            console.log(arr);

            }
            i=i+1;
          });
        this.adunits =arr;

      });
    let i=0;



    this.data.currentMessage.subscribe(message => this.message = message)
  }

  deleteAdUnit(id_user) {
  //  let id = id_user;
    console.log('delete function çalışacak servise gidiyor' + id_user);
    this.route.params.subscribe(params => {
      this.adunitservice.deleteAdUnit(id_user);
      console.log(id_user + ' Deleted');

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
    this.data.changeMessage(id_user + " numaralı veri Silindi..")
  }

  messageRemove() {
    this.data.changeMessage("")
  }

  openDialog(username, email, id_user): void {
    const dialogRef = this.dialog.open(EditRecordComponent, {
      width: '350px',
      height: '550px',
      data: {username: username, email: email, id_user: id_user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result:' + 'result.data.username')

      this.ngOnInit();
      /*  this.email = result.email;
        this.username = result.username;
        this.id_user = result.id_user;*/

    });
  }
}

