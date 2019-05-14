import { Component, OnInit, Input } from '@angular/core';
import { InputMessage } from 'src/app/shared/constant.module';
import { MatSidenav, MatSlideToggleChange, MatCheckboxChange } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ValidationModule } from 'src/app/shared/validation.module';
import { TunnelService } from 'src/app/services/tunnel.service';
import { PrintSettingService, PrintSetModel } from 'src/app/services/print-setting.service';

@Component({
  selector: 'app-print-setting',
  templateUrl: './print-setting.component.html',
  styleUrls: ['./print-setting.component.css']
})
export class PrintSettingComponent implements OnInit {

  isInput: boolean = false;

  disabledCadCheck: boolean = true;

  disabledPdfCheck: boolean = true;


  isSlideToggleDnnGenImage: boolean = false;

  isSlideToggleDnnOnly: boolean = false;

  isSlideToggleCad: boolean = false;

  isSlideTogglePdf: boolean = false;

  isCheckCad: boolean = false;

  isCheckPdf: boolean = false;

  compressionRateFormControl = new FormControl('', [Validators.required, Validators.max(100), ValidationModule.isOverZero]);



  hissuMessage: string = InputMessage.HISUU;

  hissuCompresionRateMessage: string = InputMessage.HISSU_COMPRESSION_RATE;

  maxCompresionRateMessage: string = InputMessage.MAX_PERCENT;

  minCompresionRateMessage: string = InputMessage.MIN_OVER_ZERO;


  @Input('childToSidenav') sideNav: MatSidenav;


  constructor(private tunnelService: TunnelService,
    private printSettingService: PrintSettingService) { }

  ngOnInit() {
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

    this.compressionRateFormControl.reset();
    
  }


  /**
   *  bindPrintSetting
   *
   *  customerId、ankenId、tunnelIdに紐付く出力設定情報をバインドする
   *  
   *  
   *  @return {void}
   */
  bindPrintSetting() {
    const selectedTunnel = this.tunnelService.selectedTunnel;

    this.printSettingService.getPrintSet(selectedTunnel.customerId, selectedTunnel.ankenId, selectedTunnel.tunnelId)
      .subscribe((response: any) => {

        var printSetModels = this.printSettingService.convertPrintSetModel(response);
        
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
   *  savePrintSet
   *
   *  入力した出力設定情報をDBに保存する
   *  
   *
   *  @return {void}
   */
  savePrintSet() {

    // 必須入力チェック
    if (this.compressionRateFormControl.invalid) {
      this.isInput = true;

      return;
    }

    // 出力設定情報をDBに追加
    var printSetInfo = this.getInputPrintSetModel();

    this.printSettingService.insertPrintSet(printSetInfo)
      .subscribe((response: any) => {

        this.sideNav.close();

      },
      error => {
      });
  }


  /**
   *  onChangeSlideToggleCad
   *
   *  CADスライドトグルのON/OFFを変更する
   *  ONの場合、CADに画像を埋め込むチェックボックスを活性にする
   *  OFFの場合、CADに画像を埋め込むチェックボックスを不活性にする
   *  
   *
   *  @return {void}
   */
  onChangeSlideToggleCad(event: MatSlideToggleChange) {

    this.isSlideToggleCad = event.checked;
    
    this.disabledCadCheck = !event.checked;
    
  }

  /**
   *  onChangeSlideTogglePdf
   *
   *  PDFスライドトグルのON/OFFを変更する
   *  ONの場合、PDFに画像を埋め込むチェックボックスを活性にする
   *  OFFの場合、PDFに画像を埋め込むチェックボックスを不活性にする
   *  
   *
   *  @return {void}
   */
  onChangeSlideTogglePdf(event: MatSlideToggleChange) {

    this.isSlideTogglePdf = event.checked;

    this.disabledPdfCheck = !event.checked;

  }


  /**
   *  onChangeCheckCad
   *
   *  CADチェックボックスのON/OFFを変更する
   *  
   *
   *  @return {void}
   */
  onChangeCheckCad(event: MatCheckboxChange) {

    this.isCheckCad = event.checked;
    
  }


  /**
   *  onChangeCheckPdf
   *
   *  PDFチェックボックスのON/OFFを変更する
   *  
   *
   *  @return {void}
   */
  onChangeCheckPdf(event: MatCheckboxChange) {

    this.isCheckPdf = event.checked;

  }


  /**
   *  getInputPrintSetModel
   *
   *  入力項目の出力設定情報を取得する
   *  
   *
   *  @return {PrintSetModel} 出力設定情報配列
   */
  getInputPrintSetModel(): PrintSetModel {

    const selectedTunnel = this.tunnelService.selectedTunnel;

    var printSetInfo: PrintSetModel = {
      customerId: selectedTunnel.customerId,
      ankenId: selectedTunnel.ankenId,
      tunnelId: selectedTunnel.tunnelId,
      dnnAndGenImage: this.isSlideToggleDnnGenImage,
      dnnOnlyGenImage: this.isSlideToggleDnnOnly,
      cad: this.isSlideToggleCad,
      cadAndImage: this.isCheckCad,
      pdf: this.isSlideTogglePdf,
      pdfAndImage: this.isCheckPdf,
      imageCompressionRatio: this.compressionRateFormControl.value,
      
    };

    return printSetInfo;
  }
}
