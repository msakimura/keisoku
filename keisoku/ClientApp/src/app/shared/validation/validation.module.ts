import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ValidationModule {

  static isAlphaNumeric(formControl: FormControl) {
    return { isAlphaNumeric: !/^[a-z0-9]+$/i.test(formControl.value) };
  }
}
