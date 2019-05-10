import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectitemService } from './selectitem.service';


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


  constructor(private http: HttpClient, private selectitemService: SelectitemService) { }


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
   *  insertImageOrderSets
   *
   *  imageOrderSetsをDBに追加する
   *  
   *
   *  @param  {ImageOrderSetModel[]}    imageOrderSets
   *
   *  @return {Observable<Object>} フェッチ
   */
  insertImageOrderSets(imageOrderSets: ImageOrderSetModel[]) {

    return this.http.post(this.routeUrl, imageOrderSets);
  }


  /**
   *  convertImageOrderSetModels
   *
   *  DBから取得したimageOrderSetsを画像並び設定モデル配列に変換する
   *  
   *
   *  @param  {Array}    imageOrderSets
   *
   *  @return {ImageOrderSetModel[]} 画像並び設定モデル配列
   */
  convertImageOrderSetModels(imageOrderSets): ImageOrderSetModel[] {

    var imageOrderSetModels: ImageOrderSetModel[] = new Array();

    imageOrderSets.forEach(imageOrderSet => {

      imageOrderSetModels.push(this.convertImageOrderSetModel(imageOrderSet));
    });

    return imageOrderSetModels;
  }

  /**
   *  convertImageOrderSetModel
   *
   *  DBから取得したimageOrderSetを案件モデルに変換する
   *  
   *
   *  @param  {object}    imageOrderSet
   *
   *  @return {ImageOrderSetModel} 画像並び設定モデル
   */
  convertImageOrderSetModel(imageOrderSet): ImageOrderSetModel {

    var imageAlignPositionName = '';
    var verticalAlignSelectItem = this.selectitemService.getVerticalAlignSelectItem(Number(imageOrderSet.imageOrderSet.imageAlignPosition));
    if (verticalAlignSelectItem.length === 1) {
      imageAlignPositionName = verticalAlignSelectItem[0].selectItemName;
    }


    var imageOrderSetModel: ImageOrderSetModel = {
      customerId: imageOrderSet.imageOrderSet.customerId,
      ankenId: imageOrderSet.imageOrderSet.ankenId,
      tunnelId: imageOrderSet.imageOrderSet.tunnelId,
      imageOrderSetId: imageOrderSet.imageOrderSet.imageOrderSetId,
      seikahinImageId: imageOrderSet.imageOrderSet.seikahinImageId,
      widthOrHeight: imageOrderSet.imageOrderSet.widthOrHeight,
      length: imageOrderSet.imageOrderSet.length,
      kitenKirotei: imageOrderSet.imageOrderSet.kitenKirotei,
      spanMoji: imageOrderSet.imageOrderSet.spanMoji,
      imageAlignPosition: imageOrderSet.imageOrderSet.imageAlignPosition,
      imageName: imageOrderSet.imageName,
      imageAlignPositionName: imageAlignPositionName,
    };


    return imageOrderSetModel;
  }
}
