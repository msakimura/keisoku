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

  isAdd: boolean = false;

  isEdit: boolean = false;

  
  customers: CustomerModel[] = new Array();

  kengens: KengenModel[] = new Array();;

  customerFormControl = new FormControl('', [Validators.required]);

  userNameFormControl = new FormControl('', [Validators.required]);

  loginIdFormControl = new FormControl('', [Validators.required]);
  
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6), ValidationModule.isAlphaNumeric, ValidationModule.isLowerCase, ValidationModule.isUpperCase, ValidationModule.isDigit, ValidationModule.isSymbol]);

  kengenFormControl = new FormControl();

  email: string;
  


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

  dataSource= new MatTableDataSource<UserModel>();

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
      .subscribe((response: any) => {

        this.dataSource.data = this.userService.convertUserModels(response);
        
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

    // 必須入力チェック
    if (this.customerFormControl.invalid ||
      this.userNameFormControl.invalid ||
      this.loginIdFormControl.invalid ||
      this.passwordFormControl.invalid)
    {
      this.isInput = true;

      return;
    }
    
    // ユーザ情報をDBに追加
    var userInfo = this.getInputUserModel(0);

    this.userService.insertUser(userInfo)
      .subscribe((response: any) => {

        // 追加成功時、dataSourceに追加
        if (response['Succeeded']) {

          const data = this.dataSource.data;

          data.push(this.userService.convertUserModel(response['Data']));

          this.dataSource.data = data;

          this.clearSideNavFormData();

          this.sideNav.close();
          
        }
        // 入力したログインIDが登録済みの場合、エラーメッセージ表示
        else if (response['ErrorMessage'][0]['code'] === "DuplicateUserName") {
          this.isDuplicateUserName = true;
        }
      },
      error => {
      });
  }

  /**
   *  saveUserInfo
   *
   *  選択したユーザ情報についてDB、datasourceを更新する
   *  
   *
   *  @return {void}
   */
  updateUserInfo() {

    // 必須入力チェック
    if (this.customerFormControl.invalid ||
      this.userNameFormControl.invalid ||
      this.loginIdFormControl.invalid ||
      this.passwordFormControl.invalid) {
      this.isInput = true;

      return;
    }

    // ユーザ情報でDBを更新
    var userInfo = this.getInputUserModel(this.selection.selected[0].userId);

    this.userService.updateUser(userInfo)
      .subscribe((response: any) => {

          this.sideNav.close();

          this.clearSideNavFormData();
        
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

    this.selection.selected.forEach(user => {
      this.userService.deleteUsers(user).subscribe(
        data => { },
        error => {
        });
    });

    var data = this.dataSource.data;

    this.selection.selected.forEach(user => {

      data = data.filter(function (element) { return (element.customerId != user.customerId || element.userId != user.userId); });
    });

    this.dataSource.data = data;
    
    this.selection.clear();
  }

  /**
   *  displayAddSideNav
   *
   *  追加用のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displayAddSideNav() {
    this.clearSideNavFormData();

    this.isAdd = true;

    this.sideNav.open();
  }

  /**
   *  displayEditSideNav
   *
   *  選択したユーザー情報について、編集用のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displayEditSideNav() {
    this.clearSideNavFormData();

    var user = this.selection.selected[0];

    this.customerFormControl.setValue(user.customerId);

    this.userNameFormControl.setValue(user.userName);

    this.loginIdFormControl.setValue(user.loginId);
    this.loginIdFormControl.disable();

    this.passwordFormControl.setValue(user.password);

    this.email = user.email;

    var kengenFuyos = new Array();
    user.kengenFuyos.forEach(kengenFuyo => {

      kengenFuyos.push(kengenFuyo.kengenId);
    });

    this.kengenFormControl.setValue(kengenFuyos);

    this.isEdit = true;

    this.sideNav.open();
  }

  /**
   *  closeSideNav
   *
   *  サイドナビを閉じる
   *  
   *
   *  @return {void}
   */
  closeSideNav() {
    this.sideNav.close();

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
    this.customerFormControl.reset();

    this.userNameFormControl.reset();

    this.loginIdFormControl.reset();
    this.loginIdFormControl.enable();
    
    this.passwordFormControl.markAsUntouched();
    this.passwordFormControl.setValue('');
    
    this.email = '';

    this.kengenFormControl.reset();

    this.isAdd = false;

    this.isEdit = false;

    this.isInput = false;

    this.isDuplicateUserName = false;
  }

  /**
   *  getInputUserModel
   *
   *  入力項目のユーザ情報を取得する
   *  
   *
   *  @return {UserModel} ユーザ情報
   */
  getInputUserModel(userId): UserModel{

    // 選択した権限情報を作成
    var kengenFuyos: KengenFuyoModel[] = new Array();

    if (this.kengenFormControl.value != null) {
      this.kengenFormControl.value.forEach(x => {
        kengenFuyos.push({
          customerId: this.customerFormControl.value,
          userId: userId,
          kengenId: x
        });
      });
    }

    // 入力したユーザ情報を作成
    var userInfo: UserModel = {
      customerId: this.customerFormControl.value,
      userId: userId,
      loginId: this.loginIdFormControl.value,
      password: this.passwordFormControl.value,
      userName: this.userNameFormControl.value,
      email: this.email == null ? '' : this.email,
      kengenFuyos: kengenFuyos,
      customerName: '',
      kanri: '',
      anken: '',
      tunnel: '',
      upload: '',
      download: ''
    };

    return userInfo;
  }
}
