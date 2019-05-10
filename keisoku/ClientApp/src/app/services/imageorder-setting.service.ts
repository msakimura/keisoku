import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ImageOrderSetModel {
  customerId: number;
  ankenId: number;
  tunnelId: number;
  imageOrderSetId: number;
  seikahinImageId: number;
  widthOrHeight: number;
  length: number;
  kitenKirotei: number;
  spanMoji: string;
  imageAlignPosition: string;

  imageName: string;
  imageAlignPositionName: string;

}

@Injectable({
  providedIn: 'root'
})
export class ImageorderSettingService {

  public imageOrderSetModel: ImageOrderSetModel[];

  private routeUrl: string = 'api/imageorderset';


  constructor(private http: HttpClient) { }


  /**
   *  getImageOrderSets
   *
   *  customerId、ankenId、tunnelIdに一致する全ての画像並び設定情報をDBより取得する
   *  
   *  @param  {number}    customerId
   *  @param  {number}    ankenId
   *  @param  {number}    tunnelId
   *  
   *  @return {Observable<Object>} フェッチ
   */
  getImageOrderSets(customerId: number, ankenId: number, tunnelId: number) {
    return this.http.get(this.routeUrl + '/' + customerId + '/' + ankenId + '/' + tunnelId);
  }


  /**
   *  insertImageOrderSet
   *
   *  imageOrderSetをDBに追加する
   *  
   *
   *  @param  {ImageOrderSetModel}    imageOrderSet
   *
   *  @return {Observable<Object>} フェッチ
   */
  insertImageOrderSet(imageOrderSet: ImageOrderSetModel) {

    return this.http.post(this.routeUrl, imageOrderSet);
  }
}
