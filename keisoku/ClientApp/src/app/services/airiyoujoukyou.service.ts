import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnkenModel } from './anken.service';

export interface AiRiyouJoukyouModel {
  customerId: number;
  ankenId: number;
  riyouMonth: Date;
  tunnelNumber: number;
  souEnchou: number;
  tankaId: number;
  anken: AnkenModel;

}

@Injectable({
  providedIn: 'root'
})
export class AiriyoujoukyouService {

  public aiRiyouJoukyouModels: AiRiyouJoukyouModel[] = new Array();

  private routeUrl: string = 'api/aiRiyouJoukyou';


  constructor(private http: HttpClient) { }


  /**
   *  getAllAiRiyouJoukyous
   *
   *  customerIdに一致する全てのAI利用状況情報をDBより取得する
   *  
   *  @param  {number}    customerId
   *  
   *  @return {Observable<Object>} フェッチ
   */
  getAllAiRiyouJoukyous(customerId: number) {
    return this.http.get(this.routeUrl + '/' + customerId);
  }
}
