import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CadSetModel {
  customerId: number;
  ankenId: number;
  cadVersion: number;
  cadPdfPrintPaperSize: number;
  printLayoutTopSpace: number;
  printLayoutBottomSpace: number;
  spanMojiSize: number;
  spanMojiPosition: number;
  spanMojiDirection: number;
  cadUnit: number;
  imageCreateOrder: number;
}

@Injectable({
  providedIn: 'root'
})
export class CadSettingService {
  public cadSetModel: CadSetModel;

  private routeUrl: string = 'api/cadset';

  constructor(private http: HttpClient) { }


  /**
   *  getCadSet
   *
   *  customerId、ankenIdに一致するCAD設定情報をDBより取得する
   *  
   *  @param  {number}    customerId
   *  @param  {number}    ankenId
   *  
   *  @return {Observable<Object>} フェッチ
   */
  getCadSet(customerId: number, ankenId: number) {
    return this.http.get(this.routeUrl + '/' + customerId + '/' + ankenId);
  }


  /**
   *  insertCadSet
   *
   *  printSetをDBに追加する
   *  
   *
   *  @param  {CadSetModel}    cadSet
   *
   *  @return {Observable<Object>} フェッチ
   */
  insertCadSet(cadSet: CadSetModel) {

    return this.http.post(this.routeUrl, cadSet);
  }


  /**
   *  convertCadSetModel
   *
   *  DBから取得したcadSetをCAD設定モデルに変換する
   *  
   *
   *  @param  {object}    cadSet
   *
   *  @return {CadSetModel} CAD設定モデル
   */
  convertCadSetModel(cadSet): CadSetModel {

    var cadSetModel: CadSetModel = {
      customerId: cadSet.customerId,
      ankenId: cadSet.ankenId,
      cadVersion: cadSet.cadVersion,
      cadPdfPrintPaperSize: cadSet.cadPdfPrintPaperSize,
      printLayoutTopSpace: cadSet.printLayoutTopSpace,
      printLayoutBottomSpace: cadSet.printLayoutBottomSpace,
      spanMojiSize: cadSet.spanMojiSize,
      spanMojiPosition: cadSet.spanMojiPosition,
      spanMojiDirection: cadSet.spanMojiDirection,
      cadUnit: cadSet.cadUnit,
      imageCreateOrder: cadSet.imageCreateOrder
    };


    return cadSetModel;
  }
}
