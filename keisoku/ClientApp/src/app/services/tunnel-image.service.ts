import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TunnelImageModel {
  customerId: number;
  ankenId: number;
  tunnelId: number;
  tunnelImageId: number;
  seikahinImageId: number;

  seikahinImage: SeikahinImageModel;
}

export interface SeikahinImageModel {
  seikahinImageId: number;
  imageName: string;
  imageData: string;
  width: number;
  height: number;
  hibiChushutsu: string;
  sonshou: string;
  hibiBunrui: string;

  imageUrl:string
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
   *  insertTunnelImages
   *
   *  tunnelImageをDBに追加する
   *  
   *
   *  @param  {TunnelImageModel}    tunnelImage
   *
   *  @return {Observable<Object>} フェッチ
   */
  insertTunnelImages(tunnelImage: TunnelImageModel) {

    return this.http.post(this.routeUrl, tunnelImage);
    
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

    var tunnelImageModel: TunnelImageModel = {
      customerId: tunnelImage.customerId,
      ankenId: tunnelImage.ankenId,
      tunnelId: tunnelImage.tunnelId,
      tunnelImageId: tunnelImage.tunnelImageId,
      seikahinImageId: tunnelImage.seikahinImageId,
      seikahinImage: tunnelImage.seikahinImage
    };


    return tunnelImageModel;
  }

}
