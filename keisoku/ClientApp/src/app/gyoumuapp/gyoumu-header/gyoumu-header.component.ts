import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-gyoumu-header',
  templateUrl: './gyoumu-header.component.html',
  styleUrls: ['./gyoumu-header.component.css']
})
export class GyoumuHeaderComponent implements OnInit {

  isKanriDisplay: false;

  customerName: string;

  userName: string;


  constructor(private router: Router, private userService:UserService, private authenticationService:AuthenticationService) {}

  ngOnInit() {

    if (this.authenticationService.hasTokenInfo()) {

      this.userService.getUserFromLoginId(this.authenticationService.getTokenLoginId())
        .subscribe((response: any) => {
          this.userService.loginUserModel = this.userService.convertUserModel(response);

          this.customerName = this.userService.loginUserModel.customerName + '　様';

          this.userName = this.userService.loginUserModel.userName;


          if (this.isKanriKengen()) {
            this.isKanriDisplay = true;
          }

        });
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

  /**
   *  showUserKanri
   *
   *  メインフレームにユーザ管理画面を表示する
   *  
   *
   *  @return {void}
   */
  showUserKanri() {
    this.router.navigate(["/gyoumu/userkanri"]);
  }

  /**
   *  showCustomerKanri
   *
   *  メインフレームに顧客管理画面を表示する
   *  
   *
   *  @return {void}
   */
  showCustomerKanri() {
    this.router.navigate(["/gyoumu/customerkanri"]);
  }

  /**
   *  showHome
   *
   *  メインフレームに案件一覧画面を表示する
   *  
   *
   *  @return {void}
   */
  showHome() {
    this.router.navigate(["/gyoumu"]);
  }


  /**
  *  isKanriKengen
  *
  *  管理の権限があるか判定する
  *  
  *  
  *  @return {boolean} 判定結果
  */
  isKanriKengen(): boolean {

    if (!this.userService.loginUserModel) return false;

    if (this.userService.loginUserModel.kanri === '✕') return false;

    return true;

  }
}
