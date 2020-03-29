import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AdunitService } from '../../adunit.service';
import {MustMatch} from "../../../../common/mustmatch";
import {EmailValidator} from "../../../../common/emailvalidator";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  adunit: any = {};
  angForm: FormGroup;
  message:string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private data: AdunitService,
              private formBuilder: FormBuilder,
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

    nngOnInit() {
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
/**/
  ngOnInit() {

    this.registerForm = this.formBuilder.group({

      username: ['', Validators.required],
      id_user: [null, [Validators.required,Validators.min(1)]],
      email: [null, [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]

    }
   /* , {
      validator: MustMatch('password', 'confirmPassword')
    }*/
    );
    this.route.params.subscribe(params => {
      this.adunitservice.editAdUnit(params['id_user']).subscribe(res => {
        this.adunit= res[0];
        console.log('ngOnInit id_user değeri:'+JSON.stringify(this.adunit));
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (!EmailValidator.isValid(this.adunit.email)){

      return;}
    console.log(EmailValidator.isValid(this.adunit.email))
this.updateAdUnit(this.adunit.username,this.adunit.email,this.adunit.id_user)
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  /**/
}
