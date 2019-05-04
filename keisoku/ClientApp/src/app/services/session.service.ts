import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from './authentication.service';
import { SnackbarAction, SessionMessage } from '../shared/constant.module';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar) { }


  /**
   *  signout
   *
   *  localstorage上のアクセストークンが削除されている場合、トップ画面に遷移してサインアウトする
   *
   *  @param  {string}    message
   *
   *  @return {boolean} サインアウト有無
   */
  signout(message:string) :boolean{

    if (!this.authenticationService.hasTokenInfo()) {

      this.snackBar.open(message, SnackbarAction.CLOSE, {
        duration: 5000,
      }).afterDismissed().subscribe(() => {

        this.authenticationService.logout();

        this.baseJump();

      });


      return true;
    }

    return false;
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
