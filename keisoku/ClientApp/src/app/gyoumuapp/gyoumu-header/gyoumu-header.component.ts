import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gyoumu-header',
  templateUrl: './gyoumu-header.component.html',
  styleUrls: ['./gyoumu-header.component.css']
})
export class GyoumuHeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
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
}
