import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import {AdunitService} from "../../../adunit.service";
import {EmailValidator} from "../../../../../common/emailvalidator";
import {AdUnit} from "../../index/AdUnit";
interface DialogData {
  submitted:boolean;
  user: string;
}
@Component({
  selector: 'app-searchrecord',
  templateUrl: './searchrecord.component.html'
})
export class SearchrecordComponent implements OnInit {
  email:string;
  searchForm: FormGroup;
  submitted: boolean;
  adunits: AdUnit[];
  public usernameError: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adunitservice: AdunitService,
    private formBuilder: FormBuilder,
    public dialogRefs: MatDialogRef<SearchrecordComponent>,
    @Inject(MAT_DIALOG_DATA) public datass: DialogData) {}

  onSNoClick(): void {
    this.dialogRefs.close();
  }
  get s() { return this.searchForm.controls; }

  onSSubmit(datass: DialogData) {
    //this.submitted = true;

    // stop here if form is invalid
    if (this.searchForm.invalid) {

      if (this.s.user.status == 'INVALID') {
        console.log('hata')
        this.usernameError = 'username is required';
      }
      //console.log(this.registerForm.dirty)
      return;
    }

    //this.searchAdUnit(datass.user)
    alert(datass.user);
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.searchForm.value, null, 4));
    //  this.onNoClick();
    /* this.router.navigateByUrl('/index', { skipLocationChange: true }).then(() => {
       this.router.navigate(['/index']);

     });*/
    this.onSNoClick();

  }
  searchAdUnit(user) {
    this.adunitservice
      .searchAdUnit(user)
      .subscribe((data: AdUnit[]) => {
        console.log('search function çalışacak servise gidiyor');
        this.adunits = data;
      });
    this.route.params.subscribe(params => {
      this.adunitservice.searchAdUnit(user);
      //this.router.navigate(['index']);

    });
  }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      user: [null, Validators.required]
    });
  }

}
