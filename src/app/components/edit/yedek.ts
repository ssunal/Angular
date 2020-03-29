import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AdUnit } from '../index/AdUnit';
import { AdunitService } from '../../adunit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  adunit: any = {};
  angForm: FormGroup;
  message:string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private data: AdunitService,
              private adunitservice: AdunitService,
              private fb: FormBuilder) {
    this.createForm();
    this.messageRemove();
  }


  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required ],
      email: ['', Validators.required ],
      id_user: ['', Validators.required ]
    });
    console.log('Create form içine yazılan '+this.adunit.id_user);
  }

  ngOnInit() {
    console.log('ngOnInit this.adunit.id_user değeri :'+this.adunit.id_user);
    this.route.params.subscribe(params => {
      this.adunitservice.editAdUnit(params['id_user']).subscribe(res => {
        this.adunit= res[0];
        // console.log('ngOnInit id_user değeri:'+JSON.stringify(this.adunit));
      });
    });
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  updateAdUnit(username,email,id_user) {
    this.route.params.subscribe(params => {
      this.adunitservice.updateAdUnit(username,email,params['id_user']);
      this.router.navigate(['messages']);
    });
    this.newMessage();
  }

  newMessage() {
    this.data.changeMessage(this.adunit.username+" verisi güncellendi..")
  }
  messageRemove() {
    this.data.changeMessage("")
  }
  // updateAdUnit(username,email) {
  //
  //   console.log('updateAdUnit methoduna girdi'+this.adunit.id_user);
  //   this.adunitservice.updateAdUnit(this.adunit.id_user).subscribe(res => {
  //    console.log('updated');
  //   });
  // }

}
