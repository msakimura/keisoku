import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";

import { SpinnerdialogComponent } from '../../shared/spinnerdialog/spinnerdialog.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})

export class LoginDialogComponent implements OnInit {

  error = '';

  userid: string;
  password: string;
  
  useridFormControl = new FormControl('', [Validators.required]);

  passwordFormControl = new FormControl('', [Validators.required]);


  dialogRef: MatDialogRef<SpinnerdialogComponent>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      panelClass: 'transparent',
      disableClose: true
    });
    
    // oauth認証
    this.authenticationService.login(this.userid, this.password)
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
