import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Responsive } from 'src/app/shared/constant.module';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-gyoumu-header',
  templateUrl: './gyoumu-header.component.html',
  styleUrls: ['./gyoumu-header.component.css']
})
export class GyoumuHeaderComponent implements OnInit {
  
  isKanriDisplay: boolean=false;

  customerNames: string[];

  userName: string;
  

  @ViewChild('sidenav') public sideNav: MatSidenav;

  constructor(private router: Router, private userService:UserService, private authenticationService:AuthenticationService) {}

  ngOnInit() {

    if (this.authenticationService.hasTokenInfo()) {

      this.userService.getUserFromLoginId(this.authenticationService.getTokenLoginId())
        .subscribe((response: any) => {
          this.userService.loginUserModel = this.userService.convertOneUserModels(response);

          var customerName = this.userService.loginUserModel.customerName;

          this.customerNames = this.getResponsiveCustomerName(customerName + '　様');
          
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
   *  showUserKanriFromSidenav
   *
   *  サイドナビからメインフレームにユーザ管理画面を表示する
   *  
   *
   *  @return {void}
   */
  showUserKanriFromSidenav() {
    this.showUserKanri();

    this.sideNav.close();
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
   *  showCustomerKanriFrimSidenav
   *
   *  サイドナビからメインフレームに顧客管理画面を表示する
   *  
   *
   *  @return {void}
   */
  showCustomerKanriFromSidenav() {
    this.showCustomerKanri();

    this.sideNav.close();
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
   *  showHomeFromSidenav
   *
   *  サイドナビからメインフレームに案件一覧画面を表示する
   *  
   *
   *  @return {void}
   */
  showHomeFromSidenav() {
    this.showHome();

    this.sideNav.close();

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


  /**
   *  getResponsiveCustomerName
   *
   *  レスポンシブ可能にするため、customerNameを Responsive.TITLE_TEXT_SIZEごとに分割して取得する
   *
   *  @param  {string}    customerName
   *
   *  @return {string[]} 分割した文字列
   */
  getResponsiveCustomerName(customerName: string) :string[]{

    var result: string[] = new Array();

    if (!customerName) return result;

    var count = 0;
    
    while (count * Responsive.TITLE_TEXT_SIZE < customerName.length) {

      var str = customerName.substr(count * Responsive.TITLE_TEXT_SIZE, Responsive.TITLE_TEXT_SIZE);

      result.push(str);

      count++;
      
    }
    
    return result;
  }
  
}
