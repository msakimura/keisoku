import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TunnelService, TunnelModel } from 'src/app/services/tunnel.service';
import { AnkenService } from 'src/app/services/anken.service';
import { FormControl, Validators } from '@angular/forms';
import { InputMessage } from 'src/app/shared/constant.module';
import { ValidationModule } from 'src/app/shared/validation.module';

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
  

  tunnelImages: File[] = [];

  ankenName: string;

  hissuMessage: string = InputMessage.HISUU;

  hissuTunnelMessage: string = InputMessage.HISSU_TUNNEL;

  displayedColumns: string[] = ['select', 'name', 'enchou', 'yoteiImageNum', 'image', 'ai', 'date'];


  dataSource = new MatTableDataSource<TunnelModel>();

  selection = new SelectionModel<TunnelModel>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  @ViewChild(MatSort) sort: MatSort;


  constructor(private tunnelService: TunnelService, private ankenService: AnkenService) { }

  ngOnInit() {
    this.ankenName = this.ankenService.selectedAnken.ankenName;

    this.bindAllTunnelInfo();
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

    this.dataSource.filter = filterValue;

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
   *  bindAllTunnelInfo
   *
   *  selectedAnkenに紐付く全てのトンネル情報をdataSourceにバインドする
   *  
   *  
   *  @return {void}
   */
  bindAllTunnelInfo() {
    
    if (this.ankenService.selectedAnken == null) {
      return;
    }

    this.tunnelService.getAllTunnel(this.ankenService.selectedAnken.customerId, this.ankenService.selectedAnken.ankenId)
      .subscribe((response: any) => {

        this.dataSource.data = this.tunnelService.convertTunnelModels(response);

        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;
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

        this.clearSideNavFormData();

        this.sideNav.close();

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
      tunnelEnchou: 300,
      yoteiImageNumber: 0,
      imageNumber: 0,
      aiNumber: 0,
      createdAt: new Date(),
      tunnelImages: []
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

    this.selection.selected.forEach(tunnel => {
      this.tunnelService.deleteTunnel(tunnel).subscribe(
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

    this.tunnelImages = [];
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
   *  addTunnelImages
   *
   *  選択したトンネル画像：filesをtunnelImagesに追加する
   *  
   *  @param  {File[]}    files
   *  
   *  @return {void}
   */
  addTunnelImages(files) {

    if (files.length === 0) {
      return;
    }

    for (var i = 0; i < files.length; i++) {
      var isImage = ValidationModule.isImage(files[i]);

      if (isImage) {

        var target = this.tunnelImages.find(image => {
          return (image.name == files[i].name);
        });

        if (!target) {
          this.tunnelImages.push(files[i]);
        }
      }
    }
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
}
