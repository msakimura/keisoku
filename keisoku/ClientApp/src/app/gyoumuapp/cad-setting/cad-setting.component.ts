import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { InputMessage, MaxValue } from 'src/app/shared/constant.module';
import { SelectItemModel, SelectitemService } from 'src/app/services/selectitem.service';
import { FormControl, Validators } from '@angular/forms';
import { ValidationModule } from 'src/app/shared/validation.module';

@Component({
  selector: 'app-cad-setting',
  templateUrl: './cad-setting.component.html',
  styleUrls: ['./cad-setting.component.css']
})
export class CadSettingComponent implements OnInit {
  isInput: boolean = false;


  hissuCadVersionMessage = InputMessage.HISSU_CAD_VERSION;

  hissuCadPdfPaperSizeMessage = InputMessage.HISSU_CAD_PDF_PRINT_PAPER_SIZE;

  hissuPrintLayoutTopSpaceMessage = InputMessage.HISSU_PRINT_LAYOUT_TOP_SPACE;

  hissuPrintLayoutBottomSpaceMessage = InputMessage.HISSU_PRINT_LAYOUT_BOTTOM_SPACE;

  hissuSpanMojiSizeMessage = InputMessage.HISSU_SPAN_MOJI_SIZE;

  maxPrintLayoutTopSpaceMessage = InputMessage.MAX_DECIMAL;

  minPrintLayoutTopSpaceMessage = InputMessage.MIN_ZERO;

  maxPrintLayoutBottomSpaceMessage = InputMessage.MAX_DECIMAL;

  minPrintLayoutBottomSpaceMessage = InputMessage.MIN_ZERO;

  maxSpanMojiSizeMessage = InputMessage.MAX_DECIMAL;

  minSpanMojiSizeMessage = InputMessage.MIN_OVER_ZERO;


  cadVersionFormControl = new FormControl('', [Validators.required]);

  cadPdfPrintPaperSizeFormControl = new FormControl('', [Validators.required]);

  printLayoutTopSpaceFormControl = new FormControl('', [Validators.required, Validators.max(MaxValue.DECIMAL), Validators.min(0)]);

  printLayoutBottomSpaceFormControl = new FormControl('', [Validators.required, Validators.max(MaxValue.DECIMAL), Validators.min(0)]);

  spanMojiSizeFormControl = new FormControl('', [Validators.required, Validators.max(MaxValue.DECIMAL), ValidationModule.isOverZero]);


  spanMojiPositionSelected: string;

  spanMojiDirectionSelected: string;

  cadUnitSelected: string;


  cadVersions: SelectItemModel[];

  cadPdfPrintPaperSizes: SelectItemModel[];


  @Input('childToSidenav') sideNav: MatSidenav;

  constructor(private selectitemService: SelectitemService) { }

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

    this.bindCadVersions();

    this.bindCadPdfPrintPaperSizes();

    this.spanMojiPositionSelected = '1';

    this.spanMojiDirectionSelected = '1';

    this.cadUnitSelected = '1';
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

    this.cadVersions = [];

    this.cadPdfPrintPaperSizes = [];

    this.cadVersionFormControl.reset();

    this.cadPdfPrintPaperSizeFormControl.reset();

    this.printLayoutTopSpaceFormControl.reset();

    this.printLayoutBottomSpaceFormControl.reset();

    this.spanMojiSizeFormControl.reset();

    this.spanMojiPositionSelected = '';

    this.spanMojiDirectionSelected = '';

    this.cadUnitSelected = '';
  }



  /**
   *  bindCadVersions
   *
   *  CADバージョンのcadVersionsに、選択項目テーブルのCadVersionキーに該当するデータをバインドする
   *  
   *  
   *  @return {void}
   */
  bindCadVersions() {
    this.cadVersions = this.selectitemService.getCadVersionSelectItem();
  }

  /**
   *  bindCadPdfPaperSizes
   *
   *  CAD・PDF印刷用紙サイズのcadPdfPrintPaperSizesに、選択項目テーブルのCadPdfPaperSizeキーに該当するデータをバインドする
   *  
   *  
   *  @return {void}
   */
  bindCadPdfPrintPaperSizes() {
    this.cadPdfPrintPaperSizes = this.selectitemService.getCadPdfPrintPaperSizeSelectItem();
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


  saveCadSet() {}


  /**
   *  onChangeSpanMojiPosition
   *
   *  スパン文字の位置を変更した場合、spanMojiPositionSelectedをvalueで更新する
   *
   *  @param  {boolean}    value
   *
   *  @return {void}
   */
  onChangeSpanMojiPosition(value) {

    this.spanMojiPositionSelected = value;

  }


   /**
   *  onChangeSpanMojiDirection
   *
   *  スパン文字の向きを変更した場合、spanMojiDirectionSelectedをvalueで更新する
   *
   *  @param  {boolean}    value
   *
   *  @return {void}
   */
  onChangeSpanMojiDirection(value) {

    this.spanMojiDirectionSelected = value;

  }


  /**
  *  onChangeCadUnit
  *
  *  CADはm単位かmm単位かを変更した場合、cadUnitSelectedをvalueで更新する
  *
  *  @param  {boolean}    value
  *
  *  @return {void}
  */
  onChangeCadUnit(value) {

    this.cadUnitSelected = value;

  }
}
