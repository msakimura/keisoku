import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, UserModel, KengenFuyoModel } from 'src/app/services/user.service';
import { MatTableDataSource, MatPaginator, MatSidenav } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomerService, CustomerModel } from 'src/app/services/customer.service';
import { FormControl, Validators } from '@angular/forms';
import { KengenService, KengenModel } from 'src/app/services/kengen.service';
import { ValidationModule } from 'src/app/shared/validation/validation.module';

@Component({
  selector: 'app-user-kanri',
  templateUrl: './user-kanri.component.html',
  styleUrls: ['./user-kanri.component.css']
})
  
export class UserKanriComponent implements OnInit {

  customers: CustomerModel[] = new Array();;

  kengens: KengenModel[] = new Array();;

  customerFormControl = new FormControl('', [Validators.required]);

  userNameFormControl = new FormControl('', [Validators.required]);

  loginIdFormControl = new FormControl('', [Validators.required]);

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6), ValidationModule.isAlphaNumeric]);

  kengenFormControl = new FormControl();

  userName: string;

  email: string;

  loginId: string;

  password: string;


  displayedColumns: string[] = ['select', 'customerName', 'userName', 'email', 'loginId', 'kanri', 'anken', 'tunnel', 'upload', 'download'];

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

  constructor(private userService: UserService, private customerService: CustomerService, private kengenService: KengenService) {}


  ngOnInit() {

    this.bindAllCustomerInfo();

    this.bindAllKengenInfo();

    this.dataSource = new MatTableDataSource(this.userService.userModels);
    this.dataSource.paginator = this.paginator;
  }

  /**
   *  bindAllCustomerInfo
   *
   *  DBに登録されている全ての顧客情報をcustomersにバインドする
   *  
   *
   *  @return {void}
   */
  bindAllCustomerInfo() {
    this.customerService.getAllCustomer()
      .subscribe((data: any) => this.customers = data);
  }

  /**
   *  bindAllKengenInfo
   *
   *  DBに登録されている全ての権限情報をcustomersにバインドする
   *  
   *
   *  @return {void}
   */
  bindAllKengenInfo() {
    this.kengenService.getAllKengen()
      .subscribe((data: any) => this.kengens = data);
  }

  /**
   *  saveUserInfo
   *
   *  入力したユーザ情報をDBに保存し、datasourceに追加する
   *  
   *
   *  @return {void}
   */
  saveUserInfo() {

    if (this.customerFormControl.invalid ||
      this.userNameFormControl.invalid ||
      this.loginIdFormControl.invalid ||
      this.passwordFormControl.invalid)
    {
      return;
    }
    
    var kengenFuyos: KengenFuyoModel[] = new Array();

    var kengenLength = this.kengenFormControl.value == null ? 0 : this.kengenFormControl.value.length;

    for (var i = 0; i < kengenLength; i++) {
      kengenFuyos.push({
        customerId: this.customerFormControl.value,
        userId: 0,
        kengenId: this.kengenFormControl.value[i]
      });
    }

    var userInfo: UserModel = {
      customerId: this.customerFormControl.value,
      userId: 0,
      loginId: this.loginId,
      password: this.password,
      userName: this.userName,
      email: this.email == null ? '' : this.email,
      kengenFuyos: kengenFuyos
    };

    this.userService.insertUser(userInfo)
      .subscribe((newdata: any) => {
        //const data = this.dataSource.data;
        //data.push(newdata);

        //this.dataSource.data = data;
      },
      error => {
        
      });;

    this.sideNav.close();
  }
}
