import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeikahinImageModel } from './seikahin-image.service';

export interface TunnelImageModel {
  customerId: number;
  ankenId: number;
  tunnelId: number;
  tunnelImageId: number;
  seikahinImageId: number;

  seikahinImage: SeikahinImageModel;
  innerId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TunnelImageService {

  public tunnelImageModel: TunnelImageModel[] = new Array();

  private routeUrl: string = 'api/tunnelImage';


  constructor(private http: HttpClient) { }

  /**
   *  getAllTunnelImage
   *
   *  customerId、ankenId、tunnelIdに一致する全てのトンネル画像情報をDBより取得する
   *  
   *  @param  {number}    customerId
   *  @param  {number}    ankenId
   *  @param  {number}    tunnelId
   *  
   *  @return {Observable<Object>} フェッチ
   */
  getAllTunnelImage(customerId: number, ankenId: number, tunnelId: number) {
    return this.http.get(this.routeUrl + '/' + customerId + '/' + ankenId + '/' + tunnelId);
  }


  /**
   *  insertTunnelImage
   *
   *  tunnelImageをDBに追加する
   *  
   *
   *  @param  {TunnelImageModel}    tunnelImage
   *
   *  @return {Observable<Object>} フェッチ
   */
  insertTunnelImage(tunnelImage: TunnelImageModel) {

    return this.http.post(this.routeUrl, tunnelImage);
    
  }


  /**
   *  deleteTunnelImage
   *
   *  tunnelImageをDBから削除する
   *  
   *
   *  @param  {TunnelImageModel}    tunnelImage
   *
   *  @return {Observable<Object>} フェッチ
   */
  deleteTunnelImage(tunnelImage: TunnelImageModel) {
    return this.http.delete(this.routeUrl + '/' + tunnelImage.customerId + '/' + tunnelImage.ankenId + '/' + tunnelImage.tunnelId + '/' + tunnelImage.tunnelImageId);
  }


  /**
   *  convertTunnelImageModels
   *
   *  DBから取得したtunnelImagesをトンネル画像モデル配列に変換する
   *  
   *
   *  @param  {Array}    tunnelImages
   *
   *  @return {TunnelImageModel[]} トンネル画像モデル配列
   */
  convertTunnelImageModels(tunnelImages): TunnelImageModel[] {

    var tunnelImageModels: TunnelImageModel[] = new Array();

    tunnelImages.forEach(image => {

      tunnelImageModels.push(this.convertTunnelImageModel(image));
    });

    return tunnelImageModels;
  }

  /**
   *  convertTunnelImageModel
   *
   *  DBから取得したtunnelImageをトンネル画像モデルに変換する
   *  
   *
   *  @param  {object}    tunnelImage
   *
   *  @return {TunnelImageModel} トンネル画像モデル
   */
  convertTunnelImageModel(tunnelImage): TunnelImageModel {

    var seikahinImage: SeikahinImageModel = {
      seikahinImageId: tunnelImage.seikahinImage.seikahinImageId,
      imageName: tunnelImage.seikahinImage.imageName,
      imageData: tunnelImage.seikahinImage.imageData,
      width: tunnelImage.seikahinImage.width,
      height: tunnelImage.seikahinImage.height,
      hibiChushutsu: tunnelImage.seikahinImage.hibiChushutsu,
      sonshou: tunnelImage.seikahinImage.sonshou,
      hibiBunrui: tunnelImage.seikahinImage.hibiBunrui,
      imageUrl: tunnelImage.seikahinImage.imageData
    };

    var tunnelImageModel: TunnelImageModel = {
      customerId: tunnelImage.tunnelImage.customerId,
      ankenId: tunnelImage.tunnelImage.ankenId,
      tunnelId: tunnelImage.tunnelImage.tunnelId,
      tunnelImageId: tunnelImage.tunnelImage.tunnelImageId,
      seikahinImageId: tunnelImage.tunnelImage.seikahinImageId,
      seikahinImage: seikahinImage,
      innerId: tunnelImage.tunnelImage.tunnelImageId
    };


    return tunnelImageModel;
  }

}
