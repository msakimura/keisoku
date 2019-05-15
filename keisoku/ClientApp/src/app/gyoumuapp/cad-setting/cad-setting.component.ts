import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { InputMessage, MaxValue } from 'src/app/shared/constant.module';
import { SelectItemModel, SelectitemService } from 'src/app/services/selectitem.service';
import { FormControl, Validators } from '@angular/forms';
import { ValidationModule } from 'src/app/shared/validation.module';
import { CadSetModel, CadSettingService } from 'src/app/services/cad-setting.service';
import { TunnelService } from 'src/app/services/tunnel.service';
import { InitialSettingService } from 'src/app/services/initial-setting.service';
import { AnkenService } from 'src/app/services/anken.service';

@Component({
  selector: 'app-cad-setting',
  templateUrl: './cad-setting.component.html',
  styleUrls: ['./cad-setting.component.css']
})
export class CadSettingComponent implements OnInit {
  isInput: boolean = false;


  hissuMessage = InputMessage.HISUU;

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

  imageCreateOrderSelected: string;


  cadVersions: SelectItemModel[];

  cadPdfPrintPaperSizes: SelectItemModel[];


  @Input('childToSidenav') sideNav: MatSidenav;

  constructor(private selectitemService: SelectitemService,
    private ankenService: AnkenService,
    private cadSettingService: CadSettingService,
    private initialSettingService: InitialSettingService) { }

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

    this.initPrintLayoutTopSpace();

    this.initPrintLayoutBottomSpace();

    this.initSpanMojiSizeSpace();

    this.bindCadVersions();

    this.bindCadPdfPrintPaperSizes();

    this.spanMojiPositionSelected = '1';

    this.spanMojiDirectionSelected = '1';

    this.cadUnitSelected = '1';

    this.imageCreateOrderSelected = '1';


    this.bindCadSetting();
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

    this.imageCreateOrderSelected = '';
  }


  /**
   *  initPrintLayoutTopSpace
   *
   *  印刷レイアウト上余白を初期設定する
   *  
   *  
   *  @return {void}
   */
  initPrintLayoutTopSpace() {

    var model = this.initialSettingService.getPrintLayoutTopSpaceInitialSetting();

    if (model.length === 1) {

      this.printLayoutTopSpaceFormControl.setValue(model[0].initialValue);

    }
  }


  /**
   *  initPrintLayoutBottomSpace
   *
   *  印刷レイアウト下余白を初期設定する
   *  
   *  
   *  @return {void}
   */
  initPrintLayoutBottomSpace() {

    var model = this.initialSettingService.getPrintLayoutBottompSpaceInitialSetting();

    if (model.length === 1) {

      this.printLayoutBottomSpaceFormControl.setValue(model[0].initialValue);

    }
  }



  /**
   *  initSpanMojiSizeSpace
   *
   *  スパン文字の大きさを初期設定する
   *  
   *  
   *  @return {void}
   */
  initSpanMojiSizeSpace() {

    var model = this.initialSettingService.getSpanMojiSizeInitialSetting();

    if (model.length === 1) {

      this.spanMojiSizeFormControl.setValue(model[0].initialValue);

    }
  }


  /**
   *  bindCadSetting
   *
   *  customerId、ankenIdに紐付くCAD設定情報をバインドする
   *  
   *  
   *  @return {void}
   */
  bindCadSetting() {
    const selectedAnken = this.ankenService.selectedAnken;

    this.cadSettingService.getCadSet(selectedAnken.customerId, selectedAnken.ankenId)
      .subscribe((response: any) => {

        var cadSetModel = this.cadSettingService.convertCadSetModel(response);

        this.cadVersionFormControl.setValue(cadSetModel.cadVersion);

        this.cadPdfPrintPaperSizeFormControl.setValue(cadSetModel.cadPdfPrintPaperSize);

        this.printLayoutTopSpaceFormControl.setValue(cadSetModel.printLayoutTopSpace);

        this.printLayoutBottomSpaceFormControl.setValue(cadSetModel.printLayoutBottomSpace);

        this.spanMojiSizeFormControl.setValue(cadSetModel.spanMojiSize);

        this.spanMojiPositionSelected = cadSetModel.spanMojiPosition.toString();

        this.spanMojiDirectionSelected = cadSetModel.spanMojiDirection.toString();

        this.cadUnitSelected = cadSetModel.cadUnit.toString();

        this.imageCreateOrderSelected = cadSetModel.imageCreateOrder.toString();

      },
        error => {

        });

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


  /**
   *  saveCadSet
   *
   *  入力したCAD設定情報をDBに保存する
   *  
   *
   *  @return {void}
   */
  saveCadSet() {

    // 必須入力チェック
    if (this.cadVersionFormControl.invalid ||
      this.cadPdfPrintPaperSizeFormControl.invalid ||
      this.printLayoutTopSpaceFormControl.invalid ||
      this.printLayoutBottomSpaceFormControl.invalid ||
      this.spanMojiSizeFormControl.invalid) {

      this.isInput = true;

      return;
    }

    // CAD設定情報をDBに追加
    var cadSetInfo = this.getInputCadSetModel();

    this.cadSettingService.insertCadSet(cadSetInfo)
      .subscribe((response: any) => {

        this.sideNav.close();

      },
        error => {
        });
  }


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


  /**
  *  onChangeImageCreateOrder
  *
  *  画像作成並び(左から・右から)を変更した場合、imageCreateOrderSelectedをvalueで更新する
  *
  *  @param  {boolean}    value
  *
  *  @return {void}
  */
  onChangeImageCreateOrder(value) {

    this.imageCreateOrderSelected = value;

  }


  /**
   *  getInputCadSetModel
   *
   *  入力項目のCAD設定情報を取得する
   *  
   *
   *  @return {CadSetModel} CAD設定情報
   */
  getInputCadSetModel(): CadSetModel {

    const selectedAnken = this.ankenService.selectedAnken;

    var cadSetInfo: CadSetModel = {
      customerId: selectedAnken.customerId,
      ankenId: selectedAnken.ankenId,
      cadVersion: this.cadVersionFormControl.value,
      cadPdfPrintPaperSize: this.cadPdfPrintPaperSizeFormControl.value,
      printLayoutTopSpace: this.printLayoutTopSpaceFormControl.value,
      printLayoutBottomSpace: this.printLayoutBottomSpaceFormControl.value,
      spanMojiSize: this.spanMojiSizeFormControl.value,
      spanMojiPosition: Number(this.spanMojiPositionSelected),
      spanMojiDirection: Number(this.spanMojiDirectionSelected),
      cadUnit: Number(this.cadUnitSelected),
      imageCreateOrder: Number(this.imageCreateOrderSelected)
    };

    return cadSetInfo;
  }
}
