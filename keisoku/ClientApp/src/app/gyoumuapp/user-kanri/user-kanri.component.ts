import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, UserModel, KengenFuyoModel } from 'src/app/services/user.service';
import { MatTableDataSource, MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomerService, CustomerModel } from 'src/app/services/customer.service';
import { FormControl, Validators } from '@angular/forms';
import { KengenService, KengenModel } from 'src/app/services/kengen.service';
import { ValidationModule } from 'src/app/shared/validation.module';
import { InputMessage, PasswordMessage, Kengen } from '../../shared/constant.module';

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

  isEditDisabled: boolean = true;

  editIconColor = 'diabled';

  isDeleteDisabled: boolean = true;

  deleteIconColor = 'diabled';

  
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

  @ViewChild(MatSort) sort: MatSort;


  constructor(private userService: UserService, private customerService: CustomerService, private kengenService: KengenService) { }


  ngOnInit() {

    this.bindAllCustomerInfo();

    this.bindAllKengenInfo();

    this.bindAllUserInfo();

  }

  /**
   *  applyFilterCustomerName
   *
   *  顧客名をfilterValueでフィルタする
   *
   *  @param  {string}    filterValue
   *
   *  @return {void}
   */
  applyFilterCustomerName(filterValue: string) {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.customerName.toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   *  applyFilterUserName
   *
   *  ユーザ名をfilterValueでフィルタする
   *  
   *  @param  {string}    filterValue
   *
   *  @return {void}
   */
  applyFilterUserName(filterValue: string) {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.userName.toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   *  isAllSelected
   *
   *  全てのチェックボックスが選択されているか判定する
   *  
   *
   *  @return {boolean} 判定結果
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   *  masterToggle
   *
   *  ヘッダーのチェックボックス選択時、全レコードのチェックボックスの選択有無を切り替える
   *  
   *
   *  @return {boid}
   */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));

    this.changeDisabled();
  }

  /**
   *  selectToggle
   *
   *  レコードrowのチェックボックスの選択有無を切り替える
   *  
   *  @param  {object}    row
   *
   *  @return {boid}
   */
  selectToggle(row) {
    this.selection.toggle(row);

    this.changeDisabled();
  }

  /**
   *  changeDisabled
   *
   *  レコードのチェックボックス選択数によって、編集ボタン・削除ボタンの活性/不活性を切り替える
   *  
   *
   *  @return {boid}
   */
  changeDisabled() {
    this.isEditDisabled = true;

    this.editIconColor = 'diabled';

    this.isDeleteDisabled = true;

    this.deleteIconColor = 'diabled';

    const numSelected = this.selection.selected.length;

    if (numSelected >= 1) {

      if (numSelected == 1) {
        this.isEditDisabled = false;

        this.editIconColor = 'primary';
      }

      this.isDeleteDisabled = false;

      this.deleteIconColor = 'primary';

    }
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

        this.dataSource.sort = this.sort;
      },
      error => {
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;
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
   *  updateUserInfo
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

    // 編集したユーザ情報でDBを更新
    var userInfo = this.getInputUserModel(this.selection.selected[0].userId);

    this.userService.updateUser(userInfo)
      .subscribe((response: any) => {

        var row = this.updateSelectedRowUserInfo(this.userService.convertUserModel(response.value));
        
        this.sideNav.close();

        this.clearSideNavFormData();

        if (row != null) {
          this.selectToggle(row);
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

    this.selection.selected.forEach(user => {
      this.userService.deleteUser(user).subscribe(
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

    this.changeDisabled();
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
    this.customerFormControl.disable();

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
    this.customerFormControl.enable();

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
   *  入力項目を元にユーザ情報を取得する
   *  ユーザIDはuserIdを設定する
   *  
   *  @param  {number}    userId
   *  
   *  @return {UserModel} ユーザ情報
   */
  getInputUserModel(userId): UserModel{

    // 選択した権限情報を作成
    var kengenFuyos: KengenFuyoModel[] = new Array();

    if (this.kengenFormControl.value != null) {
      this.kengenFormControl.value.forEach(kengenId => {
        kengenFuyos.push({
          customerId: this.customerFormControl.value,
          userId: userId,
          kengenId: kengenId
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

  /**
   *  updateSelectedRowUserInfo
   *
   *  選択したレコードのeditUserを編集した内容で更新する
   *  
   *  @param  {UserModel}    editUser
   *
   *  @return {UserModel} 編集した内容
   */
  updateSelectedRowUserInfo(editUser :UserModel):UserModel {
    var data = this.dataSource.data;

    var target = data.find(user => {
      return (user.customerId == editUser.customerId && user.userId == editUser.userId);
    });

    if (target == null) return null;


    target.password = editUser.password;
    target.userName = editUser.userName;
    target.email= editUser.email;
    
    target.kanri = '✕';
    target.anken = '✕';
    target.tunnel = '✕';
    target.upload = '✕';
    target.download = '✕';

    target.kengenFuyos = editUser.kengenFuyos

    if (editUser.kengenFuyos != null) {
      editUser.kengenFuyos.forEach(kengenFuyo => {

        var kengen = this.kengens.find(kengen => {
          return (kengen.kengenId == kengenFuyo.kengenId);
        });

        if (kengen.kengenName == Kengen.KANRI) {
          target.kanri = '〇';
        }
        else if (kengen.kengenName == Kengen.ANKEN) {
          target.anken = '〇';
        }
        else if (kengen.kengenName == Kengen.TUNNEL) {
          target.tunnel = '〇';
        }
        else if (kengen.kengenName == Kengen.UPLOAD) {
          target.upload = '〇';
        }
        else if (kengen.kengenName == Kengen.DOWNLOAD) {
          target.download = '〇';
        }
      });
    }

    return target;
  }
}
