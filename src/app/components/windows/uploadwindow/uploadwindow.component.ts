import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EmailValidator} from "../../../../../common/emailvalidator";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import {AdunitService} from "../../../adunit.service";
interface DialogData {
  submitted:boolean;
  id_user: number, email: string,username: string;
}
@Component({
  selector: 'app-editrecord',
  templateUrl: './uploadwindow.component.html',
  styleUrls: ['../../../../assets/css/font-awesome.css']

})
export class UploadwindowComponent implements OnInit {
  email:string;
  registerForm: FormGroup;
  submitted: boolean;
  public usernameError: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adunitservice: AdunitService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UploadwindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  get f() { return this.registerForm.controls; }

  onSubmit(data: DialogData) {
    //this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {

      if (this.f.username.status=='INVALID'){
        console.log('hata')
        this.usernameError='username is required';
      }
      //console.log(this.registerForm.dirty)
      return;
    }

    if (!EmailValidator.isValid(data.email)){

      return;}
    console.log(EmailValidator.isValid(this.data.email))
    this.updateAdUnit(this.data.username,this.data.email,this.data.id_user)
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    //  this.onNoClick();
    /* this.router.navigateByUrl('/index', { skipLocationChange: true }).then(() => {
       this.router.navigate(['/index']);

     });*/
    this.onNoClick();

  }
  updateAdUnit(username,email,id_user) {
    this.route.params.subscribe(params => {
      this.adunitservice.updateAdUnit(username,email,id_user);
      //this.router.navigate(['index']);

    });

  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({

      username: [null, Validators.required],
      id_user: [null, [Validators.required,Validators.min(1)]],
      email: [null, [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]

    });
  }

}
