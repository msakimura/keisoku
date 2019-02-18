import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from "@angular/material";
import { LoginComponent } from '../../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.css']
})
export class BaseHeaderComponent implements OnInit {

  isExpanded = false;

  userid: string;

  constructor(
    public matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  openSignin(): void {

    // ダイアログの表示
    let dialog = this.matDialog.open(LoginComponent, {
      'data': { 'title': 'ログイン' },
      'disableClose': false
    });

    // ボタンの結果を取得
    dialog.afterClosed().subscribe((result: any) => {
      // 結果をセット
      this.userid = result;
    });

  }

  gyoumuJump() {
    this.router.navigate(["/gyoumu"]);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }


  ngOnInit() {
  }

}
