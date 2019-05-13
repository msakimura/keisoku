import { Component, OnInit, Input } from '@angular/core';
import { InputMessage } from 'src/app/shared/constant.module';
import { MatSidenav, MatSlideToggleChange, MatCheckboxChange } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ValidationModule } from 'src/app/shared/validation.module';

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


  constructor() { }

  ngOnInit() {
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


  savePrintSet() {}


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
}
