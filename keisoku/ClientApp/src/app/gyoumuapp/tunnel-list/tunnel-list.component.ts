import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TunnelService, TunnelModel } from 'src/app/services/tunnel.service';
import { AnkenService } from 'src/app/services/anken.service';
import { SessionMessage } from 'src/app/shared/constant.module';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SessionService } from 'src/app/services/session.service';
import { TunnelKanriComponent } from '../tunnel-kanri/tunnel-kanri.component';
import { CadSettingComponent } from '../cad-setting/cad-setting.component';

@Component({
  selector: 'app-tunnel-list',
  templateUrl: './tunnel-list.component.html',
  styleUrls: ['./tunnel-list.component.css']
})

export class TunnelListComponent implements OnInit {

  isSideNavTunnelKanri: boolean = false;

  isSideNavCadSetting: boolean = false;


  isAdd: boolean = false;

  isEdit: boolean = false;



  isAddDisabled: boolean = true;

  addIconColor = 'diabled';

  isEditDisabled: boolean = true;

  editIconColor = 'diabled';

  isDeleteDisabled: boolean = true;

  deleteIconColor = 'diabled';


  ankenName: string;

  displayedColumns: string[] = ['select', 'name', 'enchou', 'yoteiImageNum', 'image', 'ai', 'date'];


  dataSource = new MatTableDataSource<TunnelModel>();

  selection = new SelectionModel<TunnelModel>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(TunnelKanriComponent) tunnelKanriComponent: TunnelKanriComponent;

  @ViewChild(CadSettingComponent) cadSettingComponent: CadSettingComponent;


  constructor(private router: Router,
    private tunnelService: TunnelService,
    private ankenService: AnkenService,
    private userService: UserService,
    private sessionService: SessionService) { }

  ngOnInit() {

    if (this.sessionService.signout(SessionMessage.TIMEOUT)) {
      return;
    }

    const sortingDataAccessor = (data: TunnelModel, sortHeaderId: string): string | number => {
      if (sortHeaderId === this.displayedColumns[1]) {
        return data.tunnelName;
      }
      else if (sortHeaderId === this.displayedColumns[2]) {
        return data.tunnelEnchou;
      }
      else if (sortHeaderId === this.displayedColumns[3]) {
        return data.yoteiImageNumber;
      }
      else if (sortHeaderId === this.displayedColumns[4]) {
        return data.imageNumber;
      }
      else if (sortHeaderId === this.displayedColumns[5]) {
        return data.aiNumber;
      }
      else if (sortHeaderId === this.displayedColumns[6]) {
        return data.createdAt.toString();
      }

      return '';
    };

    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = sortingDataAccessor;

    this.dataSource.sort = this.sort;


    if (this.ankenService.selectedAnken) {
      this.ankenName = this.ankenService.selectedAnken.ankenName;

      this.bindAllTunnelInfo();

      if (this.isTunnelKengen()) { this.switchDisabledAddButton(false);}
    }
    else {

      this.showHome();
    }
    
  }

  /**
   *  applyFilterTunnelName
   *
   *  トンネル名をfilterValueでフィルタする
   *  
   *  @param  {string}    filterValue
   *  
   *  @return {void}
   */
  applyFilterTunnelName(filterValue: string) {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.tunnelName.toLowerCase().includes(filter);
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

    if (!this.isTunnelKengen()) return;

    this.switchDisabledEditButton(true);

    this.switchDisabledDeleteButton(true);

    const numSelected = this.selection.selected.length;

    if (numSelected >= 1) {

      if (numSelected == 1) {
        this.switchDisabledEditButton(false);
      }

      this.switchDisabledDeleteButton(false);

    }
  }


  /**
   *  bindAllTunnelInfo
   *
   *  selectedAnkenに紐付く全てのトンネル情報をdataSourceにバインドする
   *  
   *  
   *  @return {void}
   */
  bindAllTunnelInfo() {
    
    this.tunnelService.getAllTunnel(this.ankenService.selectedAnken.customerId, this.ankenService.selectedAnken.ankenId)
      .subscribe((response: any) => {

        this.dataSource.data = this.tunnelService.convertTunnelModels(response);
        
      },
      error => {
      });
  }


  /**
   *  deleteTunnelInfo
   *
   *  選択したトンネル情報をDBから削除する
   *  
   *
   *  @return {void}
   */
  deleteTunnelInfo() {
    var data = this.dataSource.data;

    this.selection.selected.forEach(tunnel => {

      data = data.filter(function (element) { return (element.customerId != tunnel.customerId || element.ankenId != tunnel.ankenId || element.tunnelId != tunnel.tunnelId); });
    });

    this.selection.selected.forEach(tunnel => {
      this.tunnelService.deleteTunnel(tunnel).subscribe(
        (response:any) => {
          // 選択した案件情報のトンネル数を設定し、DBを更新
          this.ankenService.selectedAnken.tunnelNumber = this.dataSource.data.length;

          this.ankenService.updateAnken(this.ankenService.selectedAnken)
            .subscribe((response: any) => {
              
            });
        },
        error => {
        });
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
    this.clearSidenavFlag();

    this.isSideNavTunnelKanri = true;

    this.isAdd = true;

    this.isEdit = false;

    this.sideNav.open();
  }


  /**
   *  displayEditSideNav
   *
   *  選択したトンネル情報について、編集用のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displayEditSideNav() {
    this.clearSidenavFlag();

    this.isSideNavTunnelKanri = true;

    this.isAdd = false;

    this.isEdit = true;

    this.sideNav.open();
  }


  /**
   *  displayCadSettingSideNav
   *
   *  CAD設定のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displayCadSettingSideNav() {
    this.clearSidenavFlag();

    this.isSideNavCadSetting = true;
    
    this.sideNav.open();
  }

  /**
   *  showHome
   *
   *  メインフレームに案件一覧画面を表示する
   *  
   *
   *  @return {void}
   */
  showHome() {
    this.router.navigate(["/gyoumu"]);
  }

  /**
   *  setSelectedTunnel
   *
   *  選択したトンネル情報をtunnelServiceのselectedTunnelに設定する
   *  
   *
   *  @return {void} 
   */
  setSelectedTunnel(row) {

    this.tunnelService.selectedTunnel = row;

  }

  /**
   *  switchDisabledDeleteButton
   *
   *  削除ボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledDeleteButton(disabled: boolean) {

    this.isDeleteDisabled = disabled;

    this.deleteIconColor = disabled ? 'diabled' : 'primary';

  }

  /**
   *  switchDisabledEditButton
   *
   *  編集ボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledEditButton(disabled: boolean) {

    this.isEditDisabled = disabled;

    this.editIconColor = disabled ? 'diabled' : 'primary';

  }

  /**
   *  switchDisabledAddButton
   *
   *  追加ボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledAddButton(disabled: boolean) {

    this.isAddDisabled = disabled;

    this.addIconColor = disabled ? 'diabled' : 'primary';

  }


  /**
   *  isTunnelKengen
   *
   *  トンネル作成の権限があるか判定する
   *  
   *  
   *  @return {boolean} 判定結果
   */
  isTunnelKengen(): boolean {

    if (!this.userService.loginUserModel) return false;

    if (this.userService.loginUserModel.tunnel === '✕') return false;

    return true;

  }


  /**
  *  clearSidenavFlag
  *
  *  サイドナビに表示する画面のフラグをクリアする
  *
  *
  *  @return {void}
  */
  clearSidenavFlag() {
    this.isSideNavTunnelKanri = false;

    this.isSideNavCadSetting = false;
  }


  /**
   *  initSidenav
   *
   *  サイドナビに表示するコンポーネントを初期化する
   *  
   *  
   *  @return {void}
   */
  initSidenav() {

    if (this.isSideNavTunnelKanri) {

      this.initTunnelKanriComponent();

    }
    else if (this.isSideNavCadSetting) {

      this.initCadSettingComponent();

    }
  }


  /**
   *  initTunnelKanriComponent
   *
   *  サイドナビに表示するTunnelKanriComponentを初期化する
   *  
   *  
   *  @return {void}
   */
  initTunnelKanriComponent() {

    if (this.tunnelKanriComponent) {

      this.tunnelKanriComponent.isAdd = this.isAdd;

      this.tunnelKanriComponent.isEdit = this.isEdit;

      this.tunnelKanriComponent.dataSource = this.dataSource;

      this.tunnelKanriComponent.selection = this.selection;

      this.tunnelKanriComponent.initialize();
    }

  }


  /**
   *  initCadSettingComponent
   *
   *  サイドナビに表示するCadSettingComponentを初期化する
   *  
   *  
   *  @return {void}
   */
  initCadSettingComponent() {

    if (this.cadSettingComponent) {
      
      this.cadSettingComponent.initialize();
    }

  }


  /**
   *  destroySideNav
   *
   *  サイドナビに表示したコンポーネントの内容を破棄する
   *  
   *  
   *  @return {void}
   */
  destroySideNav() {

    if (this.isSideNavTunnelKanri) {

      this.destroyTunnelKanriComponent();

    }
    else if (this.isSideNavCadSetting) {

      this.destroyCadSettingComponent();

    }
  }


  /**
   *  destroyTunnelKanriComponent
   *
   *  サイドナビに表示したTunnelKanriComponentを破棄する
   *  
   *  
   *  @return {void}
   */
  destroyTunnelKanriComponent() {

    if (this.tunnelKanriComponent.updateData) {
      this.selectToggle(this.tunnelKanriComponent.updateData);
    }

    this.tunnelKanriComponent.destroy();
  }



  /**
   *  destroyCadSettingComponent
   *
   *  サイドナビに表示したCadSettingComponentを破棄する
   *  
   *  
   *  @return {void}
   */
  destroyCadSettingComponent() {
    
    this.cadSettingComponent.destroy();
  }


}
