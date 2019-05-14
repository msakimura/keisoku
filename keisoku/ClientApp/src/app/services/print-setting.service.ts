import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PrintSetModel {
  customerId: number;
  ankenId: number;
  tunnelId: number;
  dnnAndGenImage: boolean;
  dnnOnlyGenImage: boolean;
  cad: boolean;
  cadAndImage: boolean;
  pdf: boolean;
  pdfAndImage: boolean;
  imageCompressionRatio: number;
  
}


@Injectable({
  providedIn: 'root'
})
export class PrintSettingService {

  public printSetModel: PrintSetModel;
  
  private routeUrl: string = 'api/printset';


  constructor(private http: HttpClient) { }



  /**
   *  getPrintSet
   *
   *  customerId、ankenId、tunnelIdに一致する出力設定情報をDBより取得する
   *  
   *  @param  {number}    customerId
   *  @param  {number}    ankenId
   *  @param  {number}    tunnelId
   *  
   *  @return {Observable<Object>} フェッチ
   */
  getPrintSet(customerId: number, ankenId: number, tunnelId: number) {
    return this.http.get(this.routeUrl + '/' + customerId + '/' + ankenId + '/' + tunnelId);
  }


  /**
   *  insertPrintSet
   *
   *  printSetをDBに追加する
   *  
   *
   *  @param  {PrintSetModel}    printSet
   *
   *  @return {Observable<Object>} フェッチ
   */
  insertPrintSet(printSet: PrintSetModel) {

    return this.http.post(this.routeUrl, printSet);
  }


  /**
   *  convertPrintSetModel
   *
   *  DBから取得したprintSetを出力設定モデルに変換する
   *  
   *
   *  @param  {object}    printSet
   *
   *  @return {PrintSetModel} 出力設定モデル
   */
  convertPrintSetModel(printSet): PrintSetModel {
    
    var printSetModel: PrintSetModel = {
      customerId: 0,
      ankenId: 0,
      tunnelId: 0,
      dnnAndGenImage: false,
      dnnOnlyGenImage: false,
      cad: false,
      cadAndImage: false,
      pdf: false,
      pdfAndImage:false,
      imageCompressionRatio: 0
    };


    return printSetModel;
  }
}
