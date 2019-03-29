import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, Validators } from '@angular/forms';
import { AnkenModel, AnkenService } from 'src/app/services/anken.service';
import { InputMessage } from 'src/app/shared/constant.module';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-anken-list',
  templateUrl: './anken-list.component.html',
  styleUrls: ['./anken-list.component.css']
})
export class AnkenListComponent implements OnInit {
  isInput: boolean = false;

  isAdd: boolean = false;

  isEdit: boolean = false;

  isEditDisabled: boolean = true;

  editIconColor = 'diabled';

  isDeleteDisabled: boolean = true;

  deleteIconColor = 'diabled';


  ankenFormControl = new FormControl('', [Validators.required]);


  hissuMessage: string = InputMessage.HISUU;

  hissuAnkenMessage: string = InputMessage.HISSU_ANKEN;


  displayedColumns: string[] = ['select', 'name', 'tunnel', 'image', 'cad', 'date'];

  dataSource = new MatTableDataSource<AnkenModel>();

  selection = new SelectionModel<AnkenModel>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  @ViewChild(MatSort) sort: MatSort;


  constructor(private ankenService: AnkenService, private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const sortingDataAccessor = (data: AnkenModel, sortHeaderId: string): string | number => {
      if (sortHeaderId === this.displayedColumns[1]) {
        return data.ankenName;
      }
      else if (sortHeaderId === this.displayedColumns[2]) {
        return data.tunnelNumber;
      }
      else if (sortHeaderId === this.displayedColumns[3]) {
        return data.imageNumber;
      }
      else if (sortHeaderId === this.displayedColumns[4]) {
        return data.cadNumber;
      }
      else if (sortHeaderId === this.displayedColumns[5]) {
        return data.createdAt.toString();
      }

      return '';
    };

    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = sortingDataAccessor;

    this.dataSource.sort = this.sort;


    this.bindAllAnkenInfoLoginUser();
  }


  /**
   *  applyFilterAnkenName
   *
   *  案件名をfilterValueでフィルタする
   *  
   *  @param  {string}    filterValue
   *  
   *  @return {void}
   */
  applyFilterAnkenName(filterValue: string) {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.ankenName.toLowerCase().includes(filter);
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
   *  bindAllAnkenInfoLoginUser
   *
   *  ログイン者の顧客IDに紐付いている全ての案件情報をdataSourceにバインドする
   *  
   *
   *  @return {void}
   */
  bindAllAnkenInfoLoginUser() {
    if (this.userService.loginUserModel == null) {

      if (this.authenticationService.hasTokenInfo()) {
        this.userService.getUserFromLoginId(this.authenticationService.getTokenLoginId())
          .subscribe((response: any) => {
            this.userService.loginUserModel = this.userService.convertUserModel(response);

            this.bindAllAnkenInfoCustomer(this.userService.loginUserModel.customerId);

          });
      }
    }
    else {
      this.bindAllAnkenInfoCustomer(this.userService.loginUserModel.customerId);
    }
    
  }

  /**
   *  bindAllAnkenInfoCustomer
   *
   *  customerIdに紐付く全ての案件情報をdataSourceにバインドする
   *  
   *  @param  {number}    customerId
   *  
   *  @return {void}
   */
  bindAllAnkenInfoCustomer(customerId: number) {

    this.ankenService.getAllAnken(customerId)
      .subscribe((response: any) => {

        this.dataSource.data = this.ankenService.convertAnkenModels(response);
        
      },
      error => {
        
      });
  }


  /**
   *  saveAnkenInfo
   *
   *  入力した案件情報をDBに保存し、datasourceに追加する
   *  
   *
   *  @return {void}
   */
  saveAnkenInfo() {

    // 必須入力チェック
    if (this.ankenFormControl.invalid) {
      this.isInput = true;

      return;
    }

    // 案件情報をDBに追加
    var ankenInfo = this.getInputAnkenModel(0);

    this.ankenService.insertAnken(ankenInfo)
      .subscribe((response: any) => {

        // 追加成功時、dataSourceに追加
        const data = this.dataSource.data;

        data.push(this.ankenService.convertAnkenModel(response));

        this.dataSource.data = data;

        this.clearSideNavFormData();

        this.sideNav.close();
        
      },
        error => {
        });
  }

  /**
   *  updateAnkenInfo
   *
   *  選択した案件情報についてDB、datasourceを更新する
   *  
   *
   *  @return {void}
   */
  updateAnkenInfo() {

    // 必須入力チェック
    if (this.ankenFormControl.invalid) {
      this.isInput = true;

      return;
    }

    // 編集した案件情報でDBを更新
    var ankenInfo = this.getInputAnkenModel(this.selection.selected[0].ankenId);

    this.ankenService.updateAnken(ankenInfo)
      .subscribe((response: any) => {

        var row = this.updateSelectedRowAnkenInfo(this.ankenService.convertAnkenModel(response.value));

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
   *  deleteAnkenInfo
   *
   *  選択した案件情報をDBから削除する
   *  
   *
   *  @return {void}
   */
  deleteAnkenInfo() {

    this.selection.selected.forEach(anken => {
      this.ankenService.deleteAnken(anken).subscribe(
        data => { },
        error => {
        });
    });

    var data = this.dataSource.data;

    this.selection.selected.forEach(anken => {

      data = data.filter(function (element) { return (element.customerId != anken.customerId || element.ankenId != anken.ankenId); });
    });

    this.dataSource.data = data;

    this.selection.clear();

    this.changeDisabled();
  }

  /**
   *  getInputAnkenModel
   *
   *  入力項目の案件情報を取得する
   *  案件IDはankenIdを設定する
   *  
   *  @param  {number}    ankenId
   *
   *  @return {AnkenModel} 案件情報
   */
  getInputAnkenModel(ankenId): AnkenModel {

    var ankenInfo: AnkenModel = {
      customerId: this.userService.loginUserModel.customerId,
      ankenId: ankenId,
      ankenName: this.ankenFormControl.value,
      tunnelNumber: 0,
      imageNumber: 0,
      cadNumber: 0,
      createdAt: new Date()
    };

    return ankenInfo;
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
   *  選択した案件情報について、編集用のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displayEditSideNav() {
    this.clearSideNavFormData();

    var anken = this.selection.selected[0];

    this.ankenFormControl.setValue(anken.ankenName);

    this.isEdit = true;

    this.sideNav.open();
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
    this.ankenFormControl.reset();

    this.isAdd = false;

    this.isEdit = false;

    this.isInput = false;
  }

  /**
   *  updateSelectedRowAnkenInfo
   *
   *  選択したレコードのeditAnkenを編集した内容で更新する
   *  
   *  @param  {AnkenModel}    editAnken
   *
   *  @return {AnkenModel} 編集した内容
   */
  updateSelectedRowAnkenInfo(editAnken: AnkenModel): AnkenModel {
    var data = this.dataSource.data;

    var target = data.find(anken => {
      return (anken.customerId === editAnken.customerId && anken.ankenId === editAnken.ankenId);
    });

    if (target == null) return null;


    target.ankenName = editAnken.ankenName;

    return target;
  }


  /**
   *  setSelectedAnken
   *
   *  選択した案件情報をankenServiceのselectedAnkenに設定する
   *  
   *
   *  @return {void} 
   */
  setSelectedAnken(row) {

    this.ankenService.selectedAnken = row;
    
  }
}
