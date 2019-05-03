import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";

import { SpinnerdialogComponent } from '../../components/spinnerdialog/spinnerdialog.component';
import { InputMessage } from 'src/app/shared/constant.module';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})

export class LoginDialogComponent implements OnInit {

  error = '';
  
  useridFormControl = new FormControl('', [Validators.required]);

  passwordFormControl = new FormControl('', [Validators.required]);

  hissuUserIdMessage: string = InputMessage.HISSU_USERID;

  hissuPasswordMessage: string = InputMessage.HISSU_PASSWORD;


  dialogRef: MatDialogRef<SpinnerdialogComponent>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public matDialogRef: MatDialogRef<LoginDialogComponent>,
    private dialog: MatDialog) { }

  ngOnInit() {

    // アクセストークン削除
    this.authenticationService.logout();
    
  }

  /**
   *  onLogin
   *
   *  入力した項目が、oauth認証に成功した場合、業務アプリにログインする
   *  
   *
   *  @return {void}
   */
  onLogin() {

    // 入力チェック
    if (this.useridFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }

    // プログレススピナー表示
    this.dialogRef = this.dialog.open(SpinnerdialogComponent, {
      panelClass: 'myapp-spinner-dialog',
      disableClose: true
    });
    
    // oauth認証
    this.authenticationService.login(this.useridFormControl.value, this.passwordFormControl.value)
      .pipe(first())
      .subscribe(
      data => {
          // oauth認証に成功した場合
          this.router.navigate(["/gyoumu"]);
          this.dialogRef.close();
          this.matDialogRef.close();
          
        },
        error => {

          // oauth認証に失敗した場合
          this.dialogRef.close();
          this.error = error;

      });

    
  }
  
}
