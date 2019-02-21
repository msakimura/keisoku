import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router } from '@angular/router';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

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
    let dialog = this.matDialog.open(LoginDialogComponent, {
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
