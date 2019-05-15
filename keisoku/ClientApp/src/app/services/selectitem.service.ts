import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItemBunruiId } from '../shared/constant.module';

export interface SelectItemModel {
  selectItemBunruiId: string;
  selectItemId: number;
  selectItemName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SelectitemService {
  public selectItems: SelectItemModel[] = new Array();

  private routeUrl: string = 'api/selectitem';

  constructor(private http: HttpClient) { }


  /**
   *  getAllSelectItem
   *
   *  DBに登録されている全ての選択項目情報を取得する
   *  
   *
   *  @return {Observable<Object>} フェッチ
   */
  getAllSelectItem() {
    return this.http.get(this.routeUrl);
  }


  /**
   *  convertSelectItemModels
   *
   *  DBから取得したselectItemsを選択項目モデル配列に変換する
   *  
   *
   *  @param  {Array}    selectItems
   *
   *  @return {SelectItemModel[]} 選択項目モデル配列
   */
  convertSelectItemModels(selectItems): SelectItemModel[] {

    var selectItemModels: SelectItemModel[] = new Array();

    selectItems.forEach(selectItem => {

      selectItemModels.push(this.convertSelectItemModel(selectItem));
    });

    return selectItemModels;
  }


  /**
   *  convertSelectItemModel
   *
   *  DBから取得したselectItemを選択項目モデルに変換する
   *  
   *
   *  @param  {object}    selectItem
   *
   *  @return {SelectItemModel} 選択項目モデル
   */
  convertSelectItemModel(selectItem): SelectItemModel {

    var selectItemModel: SelectItemModel = {
      selectItemBunruiId: selectItem.selectItemBunruiId,
      selectItemId: selectItem.selectItemId,
      selectItemName: selectItem.selectItemName
    };


    return selectItemModel;
  }

  /**
   *  getVerticalAlignSelectItem
   *
   *  selectItemIdに一致する垂直揃え位置の選択項目を取得する
   *
   *  @param  {number}    selectItemId
   *
   *  @return {SelectItemModel[]} 選択項目
   */
  getVerticalAlignSelectItem(selectItemId:number): SelectItemModel[] {

    return this.selectItems.filter(function (element) {
      return element.selectItemBunruiId === SelectItemBunruiId.VERTICAL_ALIGN && element.selectItemId === selectItemId;
    });

  }


  /**
   *  getCadVersionSelectItem
   *
   *  CADバージョンの選択項目を取得する
   *
   *
   *  @return {SelectItemModel[]} 選択項目
   */
  getCadVersionSelectItem(): SelectItemModel[] {

    return this.selectItems.filter(function (element) {
      return element.selectItemBunruiId === SelectItemBunruiId.CAD_VERSION;
    });

  }


  /**
   *  getCadPdfPrintPaperSizeSelectItem
   *
   *  CAD・PDF印刷用紙サイズの選択項目を取得する
   *
   *
   *  @return {SelectItemModel[]} 選択項目
   */
  getCadPdfPrintPaperSizeSelectItem(): SelectItemModel[] {

    return this.selectItems.filter(function (element) {
      return element.selectItemBunruiId === SelectItemBunruiId.CAD_PDF_PRINT_PAPER_SIZE;
    });

  }
}
