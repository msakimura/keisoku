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

  /**
   *  isAlphaNumeric
   *
   *  formControlのvalueにおいて、アルファベットが含まれているか判定する
   *  
   *  @param  {FormControl}    formControl
   *
   *  @return {ValidationErrors | null} 判定結果
   */
  static isAlphaNumeric(formControl: FormControl): ValidationErrors | null {

    return formControl.value.match(/[a-z]/i) === null ? { 'isAlphaNumeric': true } : null;
  }

  /**
   *  isLowerCase
   *
   *  formControlのvalueにおいて、小文字のアルファベットが含まれているか判定する
   *  
   *  @param  {FormControl}    formControl
   *
   *  @return {ValidationErrors | null} 判定結果
   */
  static isLowerCase(formControl: FormControl): ValidationErrors | null{

    return formControl.value.match(/[a-z]/) === null ? { 'isLowerCase': true } : null;
  }

  /**
   *  isUpperCase
   *
   *  formControlのvalueにおいて、大文字のアルファベットが含まれているか判定する
   *  
   *  @param  {FormControl}    formControl
   *
   *  @return {ValidationErrors | null} 判定結果
   */
  static isUpperCase(formControl: FormControl): ValidationErrors | null {

    return formControl.value.match(/[A-Z]/) === null ? { 'isUpperCase': true } : null;
  }

  /**
   *  isDigit
   *
   *  formControlのvalueにおいて、数字が含まれているか判定する
   *  
   *  @param  {FormControl}    formControl
   *
   *  @return {ValidationErrors | null} 判定結果
   */
  static isDigit(formControl: FormControl): ValidationErrors | null {

    return formControl.value.match(/[0-9]/) === null ? { 'isDigit': true } : null;
  }

  /**
   *  isSymbol
   *
   *  formControlのvalueにおいて、記号が含まれているか判定する
   *  
   *  @param  {FormControl}    formControl
   *
   *  @return {ValidationErrors | null} 判定結果
   */
  static isSymbol(formControl: FormControl): ValidationErrors | null {

    return formControl.value.match(/[!#$%&()*+,.:;=?@\[\]^_{}-]/) === null ? { 'isSymbol': true } : null;
  }

  /**
   *  isImage
   *
   *  fileが画像ファイルか判定する
   *  
   *  @param  {File}    file
   *
   *  @return {ValidationErrors | null} 判定結果
   */
  static isImage(file: File): boolean {
    if (file == null) {
      return false;
    }

    var validImages = ['jpg', 'gif', 'png'];

    var extn = file.name.split(".").pop();

    var target = validImages.find(image => {
      return image == extn;
    });

    return target ? true : false;
  }
}
