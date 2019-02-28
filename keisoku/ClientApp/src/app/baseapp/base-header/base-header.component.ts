import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router } from '@angular/router';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CaptionService } from 'src/app/services/caption.service';

@Component({
  selector: 'app-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.css']
})
export class BaseHeaderComponent implements OnInit {
  

  signinCaption: string;
  
  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService,
    private captionService: CaptionService) { }

  ngOnInit() {
    if (this.authenticationService.hasTokenInfo()) {
      this.signinCaption = this.captionService.getSignoutCaption();
    }
    else {
      this.signinCaption = this.captionService.getSigninCaption();
    }
  }

  /**
   *  openSignin
   *
   *  ログインダイアログを起動しサインインする
   *  
   *
   *  @return {void}
   */
  openSignin(): void {
    
    // oauth認証済みの場合、サインアウト
    if (this.authenticationService.hasTokenInfo()) {

      this.authenticationService.logout();

      this.signinCaption = this.captionService.getSigninCaption();

    // oauth認証していない場合、ダイアログの表示
    } else {

      this.showLoginDialog();
      
    }
    
  }

  /**
   *  showLoginDialog
   *
   *  ログインダイアログを起動する
   *  
   *
   *  @return {void}
   */
  showLoginDialog() {
    const dialogRef = this.matDialog.open(LoginDialogComponent, {
      'data': { 'title': 'ログイン' },
      'disableClose': false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (this.authenticationService.hasTokenInfo()) {
        this.signinCaption = this.captionService.getSignoutCaption();;
      }

    });
  }

  /**
   *  gyoumuJump
   *
   *  oauth認証済みの場合、業務アプリを起動する
   *  
   *
   *  @return {void}
   */
  gyoumuJump() {
    //if (this.authenticationService.hasTokenInfo()) {

      this.router.navigate(["/gyoumu"]);

    //}
    //else {

    //  this.showLoginDialog();

    //}
  }
  
}
