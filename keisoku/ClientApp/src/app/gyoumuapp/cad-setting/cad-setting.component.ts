import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { InputMessage } from 'src/app/shared/constant.module';
import { SelectItemModel, SelectitemService } from 'src/app/services/selectitem.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cad-setting',
  templateUrl: './cad-setting.component.html',
  styleUrls: ['./cad-setting.component.css']
})
export class CadSettingComponent implements OnInit {
  isInput: boolean = false;


  hissuCadVersionMessage = InputMessage.HISSU_CAD_VERSION;

  hissuCadPdfPaperSizeMessage = InputMessage.HISSU_CAD_PDF_PAPER_SIZE;


  cadVersionFormControl = new FormControl('', [Validators.required]);

  cadPdfPaperSizeFormControl = new FormControl('', [Validators.required]);


  cadVersions: SelectItemModel[];

  cadPdfPaperSizes: SelectItemModel[];


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

    this.bindCadPdfPaperSizes();
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

    this.cadPdfPaperSizes = [];

    this.cadVersionFormControl.reset();

    this.cadPdfPaperSizeFormControl.reset();
  }



  /**
   *  bindCadVersions
   *
   *  CADバージョンコンボのcadVersionsに、選択項目テーブルのCadVersionキーに該当するデータをバインドする
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
   *  CADバージョンコンボのcadPdfPrintPaperSizesに、選択項目テーブルのCadPdfPaperSizeキーに該当するデータをバインドする
   *  
   *  
   *  @return {void}
   */
  bindCadPdfPaperSizes() {
    this.cadPdfPaperSizes = this.selectitemService.getCadPdfPaperSizeSelectItem();
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

}
