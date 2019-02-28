import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, UserModel } from 'src/app/services/user.service';
import { MatTableDataSource, MatPaginator, MatSidenav } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-kanri',
  templateUrl: './user-kanri.component.html',
  styleUrls: ['./user-kanri.component.css']
})
export class UserKanriComponent implements OnInit {

  customerName: string;

  userName: string;

  email: string;

  userId: string;

  password: string;

  kengen: string;

  displayedColumns: string[] = ['select', 'customerName', 'userName', 'email', 'userId', 'kanri', 'anken', 'tunnel', 'upload', 'download'];

  dataSource;

  selection = new SelectionModel<UserModel>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  constructor(private userService: UserService) {
    
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.userService.userModels);
    this.dataSource.paginator = this.paginator;
  }

  saveUserInfo() {

    var userInfo: UserModel = {
      customerId: '',
      userId: '',
      loginId: '',
      password: this.password,
      userName: this.userName,
      email: this.email
    };

    this.userService.registerUser(userInfo);

    this.sideNav.close();
  }
}
