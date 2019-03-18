import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, UserModel, KengenFuyoModel } from 'src/app/services/user.service';
import { MatTableDataSource, MatPaginator, MatSidenav } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomerService, CustomerModel } from 'src/app/services/customer.service';
import { FormControl, Validators } from '@angular/forms';
import { KengenService, KengenModel } from 'src/app/services/kengen.service';
import { ValidationModule } from 'src/app/shared/validation/validation.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-kanri',
  templateUrl: './user-kanri.component.html',
  styleUrls: ['./user-kanri.component.css']
})
  
export class UserKanriComponent implements OnInit {
  isInput: boolean = false;

  isDuplicateUserName: boolean = false;

  
  customers: CustomerModel[] = new Array();;

  kengens: KengenModel[] = new Array();;

  customerFormControl = new FormControl('', [Validators.required]);

  userNameFormControl = new FormControl('', [Validators.required]);

  loginIdFormControl = new FormControl('', [Validators.required]);

  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6), ValidationModule.isAlphaNumeric, ValidationModule.isLowerCase, ValidationModule.isUpperCase, ValidationModule.isDigit, ValidationModule.isSymbol]);

  kengenFormControl = new FormControl();

  email: string;


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

  constructor(private userService: UserService, private customerService: CustomerService, private kengenService: KengenService) { }


  ngOnInit() {
    this.bindAllUserInfo();

    this.bindAllCustomerInfo();

    this.bindAllKengenInfo();
    
  }

  /**
   *  bindAllUserInfo
   *
   *  DBに登録されている全てのユーザ情報をdataSourceにバインドする
   *  
   *
   *  @return {void}
   */
  bindAllUserInfo() {
    this.userService.getAllUser()
      .subscribe((data: any) => {

        this.dataSource = new MatTableDataSource(data);

        this.dataSource.paginator = this.paginator;
      });
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

    this.isInput = false;

    this.isDuplicateUserName = false;

    if (this.customerFormControl.invalid ||
      this.userNameFormControl.invalid ||
      this.loginIdFormControl.invalid ||
      this.passwordFormControl.invalid)
    {
      this.isInput = true;

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
      loginId: this.loginIdFormControl.value,
      password: this.passwordFormControl.value,
      userName: this.userNameFormControl.value,
      email: this.email == null ? '' : this.email,
      kengenFuyos: kengenFuyos
    };

    this.userService.insertUser(userInfo)
      .subscribe((response: any) => {

        if (response['Succeeded']) {
          const data = this.dataSource.data;

          data.push(response['Data']);

          this.dataSource.data = data;

          this.clearSideNavFormData();

          this.sideNav.close();

        }
        else if (response['ErrorMessage'][0]['code'] === "DuplicateUserName") {
          this.isDuplicateUserName = true;
        }
      },
      error => {
      });
    
  }

  /**
   *  clearSideNavFormData
   *
   *  sideNavのフォームデータをクリアする
   *  
   *
   *  @return {void}
   */
  clearSideNavFormData() {
    this.customerFormControl.setValue('');

    this.userNameFormControl.setValue('');

    this.loginIdFormControl.setValue('');

    this.passwordFormControl.setValue('');

    this.kengenFormControl.setValue('');

    this.email = '';
    
    this.kengenFormControl.setValue('');
  }
}
