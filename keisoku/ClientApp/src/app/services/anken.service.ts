import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AnkenModel {
  customerId: number;
  ankenId: number;
  ankenName: string;
  tunnelNumber: number;
  imageNumber: number;
  cadNumber: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AnkenService {
  public ankenModels: AnkenModel[] = new Array();

  public selectedAnken: AnkenModel;

  private routeUrl: string = 'api/anken';

  constructor(private http: HttpClient) { }

  /**
   *  getAllAnken
   *
   *  customerIdに一致する全ての案件情報をDBより取得する
   *  
   *  @param  {number}    customerId
   *  
   *  @return {Observable<Object>} フェッチ
   */
  getAllAnken(customerId: number) {
    return this.http.get(this.routeUrl + '/' + customerId);
  }

  /**
   *  insertAnken
   *
   *  ankenをDBに追加する
   *  
   *
   *  @param  {AnkenModel}    anken
   *
   *  @return {Observable<Object>} フェッチ
   */
  insertAnken(anken: AnkenModel) {

    return this.http.post(this.routeUrl, anken);
  }

  /**
   *  updateUser
   *
   *  ankenのDBを更新する
   *  
   *
   *  @param  {AnkenModel}    anken
   *
   *  @return {Observable<Object>} フェッチ
   */
  updateAnken(anken: AnkenModel) {

    return this.http.put(this.routeUrl, anken);
  }

  /**
   *  deleteUsers
   *
   *  ankenをDBから削除する
   *  
   *
   *  @param  {AnkenModel}    anken
   *
   *  @return {Observable<Object>} フェッチ
   */
  deleteAnken(anken: AnkenModel) {
    return this.http.delete(this.routeUrl + '/' + anken.customerId + '/' + anken.ankenId);
  }


  /**
   *  convertAnkenModels
   *
   *  DBから取得したankensを案件モデル配列に変換する
   *  
   *
   *  @param  {Array}    ankens
   *
   *  @return {AnkenModel[]} 案件モデル配列
   */
  convertAnkenModels(ankens): AnkenModel[] {

    var ankenModels: AnkenModel[] = new Array();

    ankens.forEach(anken => {

      ankenModels.push(this.convertAnkenModel(anken));
    });

    return ankenModels;
  }

  /**
   *  convertAnkenModel
   *
   *  DBから取得したuserをユーザモデルに変換する
   *  
   *
   *  @param  {object}    user
   *
   *  @return {AnkenModel} 案件モデル
   */
  convertAnkenModel(anken): AnkenModel {

    var ankenModel: AnkenModel = {
      customerId: anken.customerId,
      ankenId: anken.ankenId,
      ankenName: anken.ankenName,
      tunnelNumber: anken.tunnelNumber,
      imageNumber: anken.imageNumber,
      cadNumber: anken.cadNumber,
      createdAt: anken.createdAt
    };


    return ankenModel;
  }
}
