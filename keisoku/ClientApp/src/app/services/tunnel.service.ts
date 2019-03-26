import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TunnelModel {
  customerId: number;
  ankenId: number;
  tunnelId: number;
  tunnelName: string;
  tunnelEnchou: number;
  yoteiImageNumber: number;
  imageNumber: number;
  aiNumber: number;
  createdAt: Date;

  tunnelImages: File[];
}


@Injectable({
  providedIn: 'root'
})
export class TunnelService {

  public tunnelModel: TunnelModel[] = new Array();

  private routeUrl: string = 'api/tunnel';


  constructor(private http: HttpClient) { }

  /**
   *  getAllTunnel
   *
   *  customerId、ankenIdに一致する全てのトンネル情報をDBより取得する
   *  
   *  @param  {number}    customerId
   *  @param  {number}    ankenId
   *  
   *  @return {Observable<Object>} フェッチ
   */
  getAllTunnel(customerId: number, ankenId: number) {
    return this.http.get(this.routeUrl + '/' + customerId + '/' + ankenId);
  }

  /**
   *  insertTunnel
   *
   *  tunnelをDBに追加する
   *  
   *
   *  @param  {TunnelModel}    tunnel
   *
   *  @return {Observable<Object>} フェッチ
   */
  insertTunnel(tunnel: TunnelModel) {

    return this.http.post(this.routeUrl, tunnel);
  }

  /**
   *  updateTunnel
   *
   *  tunnelのDBを更新する
   *  
   *
   *  @param  {TunnelModel}    tunnel
   *
   *  @return {Observable<Object>} フェッチ
   */
  updateTunnel(tunnel: TunnelModel) {

    return this.http.put(this.routeUrl, tunnel);
  }

  /**
   *  deleteTunnel
   *
   *  tunnelをDBから削除する
   *  
   *
   *  @param  {TunnelModel}    tunnel
   *
   *  @return {Observable<Object>} フェッチ
   */
  deleteTunnel(tunnel: TunnelModel) {
    return this.http.delete(this.routeUrl + '/' + tunnel.customerId + '/' + tunnel.ankenId + '/' + tunnel.tunnelId);
  }


  /**
   *  convertTunnelModels
   *
   *  DBから取得したtunnelsをトンネルモデル配列に変換する
   *  
   *
   *  @param  {Array}    tunnels
   *
   *  @return {TunnelModel[]} トンネルモデル配列
   */
  convertTunnelModels(tunnels): TunnelModel[] {

    var tunnelModels: TunnelModel[] = new Array();

    tunnels.forEach(tunnel => {

      tunnelModels.push(this.convertTunnelModel(tunnel));
    });

    return tunnelModels;
  }

  /**
   *  convertTunnelModel
   *
   *  DBから取得したtunnelを案件モデルに変換する
   *  
   *
   *  @param  {object}    tunnel
   *
   *  @return {TunnelModel} 案件モデル
   */
  convertTunnelModel(tunnel): TunnelModel {

    var tunnelModel: TunnelModel = {
      customerId: tunnel.customerId,
      ankenId: tunnel.ankenId,
      tunnelId: tunnel.tunnelId,
      tunnelName: tunnel.tunnelName,
      tunnelEnchou: tunnel.tunnelEnchou,
      yoteiImageNumber: tunnel.yoteiImageNumber,
      imageNumber: tunnel.imageNumber,
      aiNumber: tunnel.aiNumber,
      createdAt: tunnel.createdAt,
      tunnelImages:[]
    };


    return tunnelModel;
  }
  
}
