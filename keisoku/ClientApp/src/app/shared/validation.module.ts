import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ValidationErrors } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ValidationModule {

  static isAlphaNumeric(formControl: FormControl): ValidationErrors | null {

    return formControl.value.match(/[a-z]/i) === null ? { 'isAlphaNumeric': true } : null;
  }

  static isLowerCase(formControl: FormControl): ValidationErrors | null{

    return formControl.value.match(/[a-z]/) === null ? { 'isLowerCase': true } : null;
  }

  static isUpperCase(formControl: FormControl): ValidationErrors | null {

    return formControl.value.match(/[A-Z]/) === null ? { 'isUpperCase': true } : null;
  }

  static isDigit(formControl: FormControl): ValidationErrors | null {

    return formControl.value.match(/[0-9]/) === null ? { 'isDigit': true } : null;
  }

  static isSymbol(formControl: FormControl): ValidationErrors | null {

    return formControl.value.match(/[!#$%&()*+,.:;=?@\[\]^_{}-]/) === null ? { 'isSymbol': true } : null;
  }
}
