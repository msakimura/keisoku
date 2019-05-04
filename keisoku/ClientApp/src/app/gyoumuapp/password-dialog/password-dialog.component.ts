import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InputMessage, PasswordMessage } from 'src/app/shared/constant.module';
import { ValidationModule } from 'src/app/shared/validation.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

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


  minlengthMessage: string = PasswordMessage.MINLENGTH;

  alphabetMessage: string = PasswordMessage.ALPHABET;

  lowcaseMessage: string = PasswordMessage.LOWCASE;

  uppercaseMessage: string = PasswordMessage.UPPERCASE;

  digitMessage: string = PasswordMessage.DIGIT;

  symbolMessage: string = PasswordMessage.SYMBOL;

  constructor(fb: FormBuilder,
    private authenticationService: AuthenticationService,
    public matDialogRef: MatDialogRef<PasswordDialogComponent>,
    private router: Router,
    private snackBar: MatSnackBar) {

    this.myForm = fb.group({

      newPassword: ['', [Validators.required,
        Validators.minLength(6),
        ValidationModule.isAlphaNumeric,
        ValidationModule.isLowerCase,
        ValidationModule.isUpperCase,
        ValidationModule.isDigit,
        ValidationModule.isSymbol]],
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

      

      // アクセストークンを削除して、トップ画面に遷移する
      // パスワード変更後は再度サインインする
      this.snackBar.open('再度サインインしてください', '閉じる')
        .afterDismissed().subscribe(() => {

          this.authenticationService.logout();

          this.baseJump();

        });

      this.matDialogRef.close();
      
      //this.authenticationService.logout();

      //this.baseJump();

    }
    // アクセストークンがキャッシュされていない場合、トップ画面に戻って、サインアウト
    else {



    }
  }

  /**
   *  baseJump
   *
   *  ベースアプリを起動する
   *  
   *
   *  @return {void}
   */
  baseJump() {
    this.router.navigate(["/"]);
  }
}
