import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { InputMessage } from 'src/app/shared/constant.module';
import { FormControl, Validators } from '@angular/forms';
import { TunnelService, TunnelModel } from 'src/app/services/tunnel.service';
import { AnkenService } from 'src/app/services/anken.service';

@Component({
  selector: 'app-tunnel-kanri',
  templateUrl: './tunnel-kanri.component.html',
  styleUrls: ['./tunnel-kanri.component.css']
})
export class TunnelKanriComponent implements OnInit {
  isInput: boolean = false;

  isAdd: boolean = false;

  isEdit: boolean = false;


  tunnelNameFormControl = new FormControl('', [Validators.required]);

  hissuMessage: string = InputMessage.HISUU;

  hissuTunnelMessage: string = InputMessage.HISSU_TUNNEL;


  dataSource: any;

  selection: any;

  updateData : TunnelModel;

  @Input('childToSidenav') sideNav: MatSidenav;
  

  constructor(private tunnelService: TunnelService,
    private ankenService: AnkenService) { }

  ngOnInit() {
  }


  /**
   *  initialize
   *
   *  初期設定する
   *  
   *  
   *  @return {void}
   */
  initialize() {

    if (this.isEdit) {
      this.tunnelNameFormControl.setValue(this.selection.selected[0].tunnelName);
    }
    
  }


  /**
   *  destroy
   *
   *  入力項目を破棄する
   *  
   *  
   *  @return {void}
   */
  destroy() {
    this.tunnelNameFormControl.reset();

    this.isAdd = false;

    this.isEdit = false;

    this.isInput = false;

    this.updateData = null;
    
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

        this.updateData = this.updateSelectedRowTunnelInfo(this.tunnelService.convertTunnelModel(response.value));

        this.sideNav.close();
        
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
      tunnelEnchou: 200,
      yoteiImageNumber: 0,
      imageNumber: 0,
      aiNumber: 0,
      createdAt: new Date()
    };

    return tunnelInfo;
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
