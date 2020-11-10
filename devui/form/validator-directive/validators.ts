import { AbstractControl, ValidationErrors } from '@angular/forms';



export class DValidators {

  /* Failed if only has whitespace */
  static whiteSpace(control: AbstractControl): ValidationErrors|null {
    let res = null;
    if (typeof control.value === 'string' && control.value.length !== 0 && control.value.trim().length === 0) {
      res =  { 'whitespace': true };
    }
    return res;
  }
}
