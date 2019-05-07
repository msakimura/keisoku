import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface HibiwareShoriSetModel {
  customerId: number;
  ankenId: number;
  tunnelId: number;
  tanshukuRemove: number;
  kaikouhabaMojiSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class HibiwareshoriSettingService {

  public hibiwareShoriSetModel: HibiwareShoriSetModel;

  private routeUrl: string = 'api/hibiwareshoriset';


  constructor(private http: HttpClient) { }


  /**
   *  getHibiwareShoriSet
   *
   *  customerId、ankenId、tunnelIdに一致するひび割れ処理設定情報をDBより取得する
   *  
   *  @param  {number}    customerId
   *  @param  {number}    ankenId
   *  @param  {number}    tunnelId
   *  
   *  @return {Observable<Object>} フェッチ
   */
  getHibiwareShoriSet(customerId: number, ankenId: number, tunnelId: number) {
    return this.http.get(this.routeUrl + '/' + customerId + '/' + ankenId + '/' + tunnelId);
  }


  /**
   *  insertHibiwareShoriSet
   *
   *  hibiwareshoriSetをDBに追加する
   *  
   *
   *  @param  {HibiwareShoriSetModel}    hibiwareShoriSet
   *
   *  @return {Observable<Object>} フェッチ
   */
  insertHibiwareShoriSet(hibiwareShoriSet: HibiwareShoriSetModel) {

    return this.http.post(this.routeUrl, hibiwareShoriSet);
  }
}
