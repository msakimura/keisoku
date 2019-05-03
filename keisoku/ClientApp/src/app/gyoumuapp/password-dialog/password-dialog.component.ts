import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InputMessage, PasswordMessage } from 'src/app/shared/constant.module';
import { ValidationModule } from 'src/app/shared/validation.module';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {
  isInput: boolean = false;

  isCurrentPass: boolean = false;

  isConfirmPass: boolean = false;


  currentPasswordFormControl = new FormControl('', [Validators.required]);

  myForm: FormGroup;


  hissuMessage: string = InputMessage.HISUU;

  hissuCurrentPassMessage: string = InputMessage.HISSU_CURRENT_PASS;

  hissuNewPassMessage: string = InputMessage.HISSU_NEW_PASS;

  confirmPassMessage: string = PasswordMessage.CONFIRM;

  currentPassMessage: string = PasswordMessage.CURRENT;


  constructor(fb: FormBuilder, private authenticationService: AuthenticationService) {

    this.myForm = fb.group({

      newPassword: ['', [Validators.required]],
      confirmPassword: ['']

    }, { validator: ValidationModule.isPasswordMatch });

  }

  ngOnInit() {
    
  }


  /**
   *  onChange
   *
   *  サインイン時に入力するパスワードを新パスワードに変更する
   *  
   *
   *  @return {void}
   */
  onChange() {
    this.isInput = false;

    this.isCurrentPass = false;

    this.isConfirmPass = false;

    if (this.authenticationService.hasTokenInfo()) {


      // 必須入力チェック
      if (this.currentPasswordFormControl.invalid || !this.myForm.controls['newPassword'].value) {
        this.isInput = true;
        return;
      }


      // 現在のパスワードチェック
      const password = this.authenticationService.getTokenPassword();

      if (password !== this.currentPasswordFormControl.value) {
        this.isCurrentPass = true;
        return;
      }


      // 新パスワードチェック
      if (this.myForm.invalid) {
        this.isConfirmPass = true;
        return;
      }

    }
    else {

    }
  }
  
}
