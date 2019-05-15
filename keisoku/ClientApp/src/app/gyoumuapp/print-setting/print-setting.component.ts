import { Component, OnInit, Input } from '@angular/core';
import { InputMessage } from 'src/app/shared/constant.module';
import { MatSidenav, MatSlideToggleChange, MatCheckboxChange } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ValidationModule } from 'src/app/shared/validation.module';
import { TunnelService } from 'src/app/services/tunnel.service';
import { PrintSettingService, PrintSetModel } from 'src/app/services/print-setting.service';
import { InitialSettingService } from 'src/app/services/initial-setting.service';

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

  imageCompressionRateFormControl = new FormControl('', [Validators.required, Validators.max(100), ValidationModule.isOverZero]);



  hissuMessage: string = InputMessage.HISUU;

  hissuCompresionRateMessage: string = InputMessage.HISSU_COMPRESSION_RATE;

  maxCompresionRateMessage: string = InputMessage.MAX_PERCENT;

  minCompresionRateMessage: string = InputMessage.MIN_OVER_ZERO;


  @Input('childToSidenav') sideNav: MatSidenav;


  constructor(private tunnelService: TunnelService,
    private printSettingService: PrintSettingService,
    private initialSettingService: InitialSettingService) { }

  ngOnInit() {
  }


  /**
   *  initialize
   *
   *  出力設定を初期設定する
   *  
   *  
   *  @return {void}
   */
  initialize() {
    this.initImageCompressionRate();

    this.bindPrintSetting();
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
    this.isInput = false;

    this.disabledCadCheck = true;

    this.disabledPdfCheck = true;

    this.isSlideToggleDnnGenImage = false;

    this.isSlideToggleDnnOnly = false;

    this.isSlideToggleCad = false;

    this.isSlideTogglePdf = false;

    this.isCheckCad = false;

    this.isCheckPdf = false;

    this.imageCompressionRateFormControl.reset();
    
  }


  /**
   *  initImageCompressionRate
   *
   *  画像圧縮率を初期設定する
   *  
   *  
   *  @return {void}
   */
  initImageCompressionRate() {

    var model = this.initialSettingService.getImageCompressionRateInitialSetting();

    if (model.length === 1) {

      this.imageCompressionRateFormControl.setValue(model[0].initialValue);

    }
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

        var printSetModel = this.printSettingService.convertPrintSetModel(response);

        this.isSlideToggleDnnGenImage = printSetModel.dnnAndGenImage;

        this.isSlideToggleDnnOnly = printSetModel.dnnOnlyGenImage;

        this.isSlideToggleCad = printSetModel.cad;

        this.isSlideTogglePdf = printSetModel.pdf;

        this.isCheckCad = printSetModel.cadAndImage;

        this.isCheckPdf = printSetModel.pdfAndImage;

        this.disabledCadCheck = !printSetModel.cad;

        this.disabledPdfCheck = !printSetModel.pdf;

        this.imageCompressionRateFormControl.setValue(printSetModel.imageCompressionRatio);
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
    if (this.imageCompressionRateFormControl.invalid) {
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
   *  onChangeSlideToggleDnnGenImage
   *
   *  DNN+現画像スライドトグルのON/OFFを変更する
   *  
   *
   *  @return {void}
   */
  onChangeSlideToggleDnnGenImage(event: MatSlideToggleChange) {

    this.isSlideToggleDnnGenImage = event.checked;

  }


  /**
   *  onChangeSlideToggleDnnOnly
   *
   *  DNNのみ現画像スライドトグルのON/OFFを変更する
   *  
   *
   *  @return {void}
   */
  onChangeSlideToggleDnnOnly(event: MatSlideToggleChange) {

    this.isSlideToggleDnnOnly = event.checked;

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

    var cadAndImage = this.isSlideToggleCad ? this.isCheckCad : false;

    var pdfAndImage = this.isSlideTogglePdf ? this.isCheckPdf : false;

    var printSetInfo: PrintSetModel = {
      customerId: selectedTunnel.customerId,
      ankenId: selectedTunnel.ankenId,
      tunnelId: selectedTunnel.tunnelId,
      dnnAndGenImage: this.isSlideToggleDnnGenImage,
      dnnOnlyGenImage: this.isSlideToggleDnnOnly,
      cad: this.isSlideToggleCad,
      cadAndImage: cadAndImage,
      pdf: this.isSlideTogglePdf,
      pdfAndImage: pdfAndImage,
      imageCompressionRatio: this.imageCompressionRateFormControl.value,
      
    };

    return printSetInfo;
  }
}
