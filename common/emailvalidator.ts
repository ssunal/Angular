import { FormControl } from '@angular/forms';

export class EmailValidator {

  public static isValid(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static isMultiValid(control: FormControl): any {

    console.log(control.value);
    let tempEmail = control.value;
    let invalid = false;
    let regex =/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    if(tempEmail.indexOf(',') > -1){
      var emails = control.value.split(',');
      for (let email of emails) {
        console.log(email);
        let isValid = EmailValidator.isValid(email)
        if(!isValid){
          return{"email not valid":isValid}
        }
      }
      return null;
    }
    else{
      let email = control.value.split(',');
      if( email == "" || ! regex.test(email)){
        invalid = true;
        return {
          "email not valid": invalid
        };
      }
      console.log("valid");
      return null;

    }
  }
}
