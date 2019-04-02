import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TunnelService, TunnelModel } from 'src/app/services/tunnel.service';
import { AnkenService } from 'src/app/services/anken.service';
import { FormControl, Validators } from '@angular/forms';
import { InputMessage } from 'src/app/shared/constant.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tunnel-list',
  templateUrl: './tunnel-list.component.html',
  styleUrls: ['./tunnel-list.component.css']
})

export class TunnelListComponent implements OnInit {
  isInput: boolean = false;

  isAdd: boolean = false;

  isEdit: boolean = false;

  isEditDisabled: boolean = true;

  editIconColor = 'diabled';

  isDeleteDisabled: boolean = true;

  deleteIconColor = 'diabled';


  tunnelNameFormControl = new FormControl('', [Validators.required]);
  

  ankenName: string;

  hissuMessage: string = InputMessage.HISUU;

  hissuTunnelMessage: string = InputMessage.HISSU_TUNNEL;

  displayedColumns: string[] = ['select', 'name', 'enchou', 'yoteiImageNum', 'image', 'ai', 'date'];


  dataSource = new MatTableDataSource<TunnelModel>();

  selection = new SelectionModel<TunnelModel>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  @ViewChild(MatSort) sort: MatSort;


  constructor(private router: Router, private tunnelService: TunnelService, private ankenService: AnkenService) { }

  ngOnInit() {

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
   *  saveTunnelInfo
   *
   *  入力したトンネル情報をDBに保存し、datasourceに追加する
   *  
   *
   *  @return {void}
   */
  saveTunnelInfo() {

    // 必須入力チェック
    if (this.tunnelNameFormControl.invalid) {
      this.isInput = true;

      return;
    }

    // トンネル情報をDBに追加
    var tunnelInfo = this.getInputTunnelModel(0);

    this.tunnelService.insertTunnel(tunnelInfo)
      .subscribe((response: any) => {

        // 追加成功時、dataSourceに追加
        const data = this.dataSource.data;

        data.push(this.tunnelService.convertTunnelModel(response));

        this.dataSource.data = data;

        // 選択した案件情報のトンネル数を設定し、DBを更新
        this.ankenService.selectedAnken.tunnelNumber = this.dataSource.data.length;

        this.ankenService.updateAnken(this.ankenService.selectedAnken)
          .subscribe((response: any) => {
            this.clearSideNavFormData();

            this.sideNav.close();
          });
        
      },
      error => {
      });

    
  }


  /**
   *  updateTunnelInfo
   *
   *  選択したトンネル情報についてDB、datasourceを更新する
   *  
   *
   *  @return {void}
   */
  updateTunnelInfo() {

    // 必須入力チェック
    if (this.tunnelNameFormControl.invalid) {
      this.isInput = true;

      return;
    }

    // 編集したトンネル情報でDBを更新
    var tunnelInfo = this.getInputTunnelModel(this.selection.selected[0].tunnelId);

    this.tunnelService.updateTunnel(tunnelInfo)
      .subscribe((response: any) => {

        var row = this.updateSelectedRowTunnelInfo(this.tunnelService.convertTunnelModel(response.value));

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
   *  getInputTunnelModel
   *
   *  入力項目のトンネル情報を取得する
   *  トンネルIDはtunnelIdを設定する
   *  
   *  @param  {number}    tunnelId
   *
   *  @return {TunnelModel} トンネル情報
   */
  getInputTunnelModel(tunnelId): TunnelModel {

    var tunnelInfo: TunnelModel = {
      customerId: this.ankenService.selectedAnken.customerId,
      ankenId: this.ankenService.selectedAnken.ankenId,
      tunnelId: tunnelId,
      tunnelName: this.tunnelNameFormControl.value,
      tunnelEnchou: 0,
      yoteiImageNumber: 0,
      imageNumber: 0,
      aiNumber: 0,
      createdAt: new Date()
    };

    return tunnelInfo;
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
              this.clearSideNavFormData();

              this.sideNav.close();
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
   *  clearSideNavFormData
   *
   *  sideNavのフォームデータをクリアする
   *  
   *
   *  @return {void}
   */
  clearSideNavFormData() {
    this.tunnelNameFormControl.reset();

    this.isAdd = false;

    this.isEdit = false;

    this.isInput = false;
    
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
   *  選択したトンネル情報について、編集用のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displayEditSideNav() {
    this.clearSideNavFormData();

    var tunnel = this.selection.selected[0];

    this.tunnelNameFormControl.setValue(tunnel.tunnelName);

    this.isEdit = true;

    this.sideNav.open();
  }


  /**
   *  updateSelectedRowTunnelInfo
   *
   *  選択したレコードのeditTunnelを編集した内容で更新する
   *  
   *  @param  {TunnelModel}    editTunnel
   *
   *  @return {TunnelModel} 編集した内容
   */
  updateSelectedRowTunnelInfo(editTunnel: TunnelModel): TunnelModel {
    var data = this.dataSource.data;

    var target = data.find(tunnel => {
      return (tunnel.customerId == editTunnel.customerId && tunnel.ankenId == editTunnel.ankenId && tunnel.tunnelId == editTunnel.tunnelId);
    });

    if (target == null) return null;


    target.tunnelName = editTunnel.tunnelName;

    return target;
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
}
