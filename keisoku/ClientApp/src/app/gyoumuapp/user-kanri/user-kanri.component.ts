import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, UserModel, KengenFuyoModel } from 'src/app/services/user.service';
import { MatTableDataSource, MatPaginator, MatSidenav } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomerService, CustomerModel } from 'src/app/services/customer.service';
import { FormControl, Validators } from '@angular/forms';
import { KengenService, KengenModel } from 'src/app/services/kengen.service';
import { ValidationModule } from 'src/app/shared/validation.module';
import { InputMessage, PasswordMessage } from '../../shared/constant.module';

@Component({
  selector: 'app-user-kanri',
  templateUrl: './user-kanri.component.html',
  styleUrls: ['./user-kanri.component.css']
})
  
export class UserKanriComponent implements OnInit {
  isInput: boolean = false;

  isDuplicateUserName: boolean = false;

  
  customers: CustomerModel[] = new Array();

  kengens: KengenModel[] = new Array();;

  customerFormControl = new FormControl('', [Validators.required]);

  userNameFormControl = new FormControl('', [Validators.required]);

  loginIdFormControl = new FormControl('', [Validators.required]);

  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6), ValidationModule.isAlphaNumeric, ValidationModule.isLowerCase, ValidationModule.isUpperCase, ValidationModule.isDigit, ValidationModule.isSymbol]);

  kengenFormControl = new FormControl();

  email: string;

  customerSelected: string;


  hissuMessage: string = InputMessage.HISUU;

  usedLoginIdMessage: string = InputMessage.USED_LOGINID;

  hissuCustomerMessage: string = InputMessage.HISSU_CUSTOMER;

  hissuUserNameMessage: string = InputMessage.HISSU_USERNAME;

  hissuLoginIdMessage: string = InputMessage.HISSU_LOGINID;

  hissuPasswordMessage: string = InputMessage.HISSU_PASSWORD;

  minlengthMessage: string = PasswordMessage.MINLENGTH;

  alphabetMessage: string = PasswordMessage.ALPHABET;

  lowcaseMessage: string = PasswordMessage.LOWCASE;

  uppercaseMessage: string = PasswordMessage.UPPERCASE;

  digitMessage: string = PasswordMessage.DIGIT;

  symbolMessage: string = PasswordMessage.SYMBOL;


  displayedColumns: string[] = ['select', 'customerName', 'userName', 'email', 'loginId', 'kanri', 'anken', 'tunnel', 'upload', 'download'];

  dataSource: MatTableDataSource<UserModel>;

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

    this.bindAllCustomerInfo();

    this.bindAllKengenInfo();

    this.bindAllUserInfo();
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

        this.dataSource.data.forEach(user => {
          user.kengenFuyos.forEach(kengenFuyo => {
          });
        });
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

    if (this.kengenFormControl.value != null) {
      this.kengenFormControl.value.forEach(x => {
        kengenFuyos.push({
          customerId: this.customerFormControl.value,
          userId: 0,
          kengenId: x
        });
      });
    }

    var userInfo: UserModel = {
      customerId: this.customerFormControl.value,
      userId: 0,
      loginId: this.loginIdFormControl.value,
      password: this.passwordFormControl.value,
      userName: this.userNameFormControl.value,
      email: this.email == null ? '' : this.email,
      kengenFuyos: kengenFuyos,
      customerName: '',
      kanri: '',
      anken: '',
      tunnel: '',
      upload:'',
      download:''
    };

    this.userService.insertUser(userInfo)
      .subscribe((response: any) => {

        if (response['Succeeded']) {
          const data = this.dataSource.data;

          data.push(response['Data']);

          this.dataSource.data = data;

          this.sideNav.close();

          this.clearSideNavFormData();
          
        }
        else if (response['ErrorMessage'][0]['code'] === "DuplicateUserName") {
          this.isDuplicateUserName = true;
        }
      },
      error => {
      });
  }


  /**
   *  deleteUserInfo
   *
   *  選択したユーザ情報をDBから削除する
   *  
   *
   *  @return {void}
   */
  deleteCustomerInfo() {

    for (var i = 0; i < this.selection.selected.length; i++) {
      this.userService.deleteUsers(this.selection.selected[i]).subscribe(
        data => { },
        error => {
        });
    }

    for (var i = 0; i < this.selection.selected.length; i++) {
      const data = this.dataSource.data;
      data.splice(0, 1);

      this.dataSource.data = data;
    }

    this.selection.clear();
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
