import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from "@angular/material";
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  userid: string;

  constructor(
    public matDialog: MatDialog,
    private snackBar: MatSnackBar) { }

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

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  
}
