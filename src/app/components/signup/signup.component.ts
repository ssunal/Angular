import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,FormControl,FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import {startWith, map} from 'rxjs/operators';
import {ErrorStateMatcher} from '@angular/material/core';
import {AdunitService} from "../../adunit.service";

//import { AdUnit } from '../components/index/AdUnit';
export interface StateGroup {
  letter: string;
  names: string[];

}


export const _filters = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * @title Option groups autocomplete
 */
@Component({

  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignUpComponent implements OnInit {


  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

//------------------------------------------------------------------------
  stateForm: FormGroup = this.fb.group({
    stateGroup: '',
     username:'',
    // firstname: ['', Validators.required],
    // username: ['', Validators.required],
  secret_word: 'ufuk',

  });

    stateGroups: StateGroup[] = [
      {letter: 'A',names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']},
      {letter: 'C',names: ['California', 'Colorado', 'Connecticut']},
      {letter: 'D',names: ['Delaware']},
      {letter: 'F',names: ['Florida']},
      {letter: 'G',names: ['Georgia']},
      {letter: 'H',names: ['Hawaii']},
      {letter: 'I',names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']},
      {letter: 'K',names: ['Kansas', 'Kentucky']},
      {letter: 'L',names: ['Louisiana']},
      {letter: 'M',names: ['Maine', 'Maryland', 'Massachusetts', 'Michigan','Minnesota', 'Mississippi', 'Missouri', 'Montana']},
      {letter: 'N',names: ['Nebraska', 'Nevada', 'New Hampshire', 'New Jersey','New Mexico', 'New York', 'North Carolina', 'North Dakota']},
      {letter: 'O',names: ['Ohio', 'Oklahoma', 'Oregon']},
      {letter: 'P',names: ['Pennsylvania']},
      {letter: 'R',names: ['Rhode Island']}, {letter: 'S',names: ['South Carolina', 'South Dakota']},
      {letter: 'T',names: ['Tennessee', 'Texas']},
      {letter: 'U',names: ['Utah']}, {letter: 'V',names: ['Vermont', 'Virginia']},
      {letter: 'W',names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']}
    ];

  stateGroupOptions: Observable<StateGroup[]>;
    constructor(
      private adunitservice: AdunitService,
        private data: AdunitService,
          private router: Router,
         private fb: FormBuilder) {

    }
    private _filterGroup(value: string): StateGroup[] {
      if (value) {
        return this.stateGroups
          .map(group => ({letter: group.letter, names: _filters(group.names, value)}))
          .filter(group => group.names.length > 0);
      }

      return this.stateGroups;
    }
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
    ngOnInit() {
      this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterGroup(value))
        );
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
    }
    addAdUnit(username, email, id_user) {

      this.adunitservice.addAdUnit(username, email,id_user);
      this.newMessage(username);
      this.router.navigate(['messages']);
    }
      newMessage(username) {
      this.data.changeMessage(username+" verisi eklendi..")
    }
    messageRemove() {
      this.data.changeMessage("")
    }
      usernameControl = new FormControl('', [Validators.required]);
      firstNameControl = new FormControl('', [Validators.required]);
      emailFormControl = new FormControl('', [Validators.required,Validators.email]);
      matcher = new MyErrorStateMatcher();
      step = 0;
      setStep(index: number) {
        this.step = index;
      }
      nextStep() {
        this.step++;
      }
      prevStep() {
        this.step--;
      }
}
