import { Component, OnInit, Input } from '@angular/core';
import { InputMessage, MaxValue } from 'src/app/shared/constant.module';
import { FormControl, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material';
import { HibiwareshoriSettingService, HibiwareShoriSetModel } from 'src/app/services/hibiwareshori-setting.service';
import { TunnelService } from 'src/app/services/tunnel.service';

@Component({
  selector: 'app-hibiwareshori-setting',
  templateUrl: './hibiwareshori-setting.component.html',
  styleUrls: ['./hibiwareshori-setting.component.css']
})
export class HibiwareshoriSettingComponent implements OnInit {
  isInput: boolean = false;

  shortLineRemoveFormControl = new FormControl('', [Validators.required, Validators.max(MaxValue.DOUBLE), Validators.max(MaxValue.DOUBLE)]);

  kaikouhabaMojiSizeFormControl = new FormControl('', [Validators.required, Validators.max(MaxValue.DECIMAL)]);


  hissuMessage: string = InputMessage.HISUU;

  hissuShortLineRemoveMessage: string = InputMessage.HISSU_TANSHUKU_REMOVE;

  hissuKaikouhabaMojiSizeMessage: string = InputMessage.HISSU_KAIKOUHABA_MOJI_SIZE;

  numericMessage: string = InputMessage.NUMERIC;

  maxShortLineRemoveMessage: string = InputMessage.MAXLENGTH_DOUBLE;

  maxKaikouhabaMojiSizeMessage: string = InputMessage.MAXLENGTH_DECIMAL;


  @Input('childToSidenav') sideNav: MatSidenav;


  constructor(private hibiwareshoriSettingService: HibiwareshoriSettingService,
    private tunnelService: TunnelService) { }

  ngOnInit() {
    this.bindHibiwareshoriSetting();

  }

  /**
   *  bindHibiwareshoriSetting
   *
   *  customerId、ankenId、tunnelIdに紐付くひび割れ処理設定情報をバインドする
   *  
   *  
   *  @return {void}
   */
  bindHibiwareshoriSetting() {
    const selectedTunnel = this.tunnelService.selectedTunnel;

    this.hibiwareshoriSettingService.getHibiwareShoriSet(selectedTunnel.customerId, selectedTunnel.ankenId, selectedTunnel.tunnelId)
      .subscribe((response: any) => {

        this.shortLineRemoveFormControl.setValue(response.tanshukuRemove);

        this.kaikouhabaMojiSizeFormControl.setValue(response.kaikouhabaMojiSize);

      },
      error => {

      });
    
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
   *  saveHibiwareShoriSet
   *
   *  入力したひび割れ処理設定情報をDBに保存する
   *  
   *
   *  @return {void}
   */
  saveHibiwareShoriSet() {

    // 必須入力チェック
    if (this.shortLineRemoveFormControl.invalid || this.kaikouhabaMojiSizeFormControl.invalid) {
      this.isInput = true;

      return;
    }

    // ひび割れ処理設定情報をDBに追加
    var hibiwareShoriSetInfo = this.getInputHibiwareShoriSetModel();

    this.hibiwareshoriSettingService.insertHibiwareShoriSet(hibiwareShoriSetInfo)
      .subscribe((response: any) => {
        
        this.sideNav.close();

      },
      error => {
      });
  }

  /**
   *  getInputHibiwareShoriSetModel
   *
   *  入力項目のひび割れ処理設定情報を取得する
   *  
   *
   *  @return {HibiwareShoriSetModel} ひび割れ処理設定情報
   */
  getInputHibiwareShoriSetModel(): HibiwareShoriSetModel {

    const selectedTunnel = this.tunnelService.selectedTunnel;

    var hibiwareShoriSetInfo: HibiwareShoriSetModel = {
      customerId: selectedTunnel.customerId,
      ankenId: selectedTunnel.ankenId,
      tunnelId: selectedTunnel.tunnelId,
      shortLineRemove: this.shortLineRemoveFormControl.value,
      kaikouhabaMojiSize: this.kaikouhabaMojiSizeFormControl.value
    };

    return hibiwareShoriSetInfo;
  }
}
