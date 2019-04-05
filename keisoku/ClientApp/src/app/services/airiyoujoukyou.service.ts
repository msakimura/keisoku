import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnkenService } from './anken.service';

export interface AiRiyouJoukyouModel {
  customerId: number;
  ankenId: number;
  year: number;
  month: number;
  tunnelNumber: number;
  souEnchou: number;
  tankaId: number;
  tanka: number;
  kei: number;

  ankenName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiriyoujoukyouService {

  public aiRiyouJoukyouModels: AiRiyouJoukyouModel[] = new Array();

  private routeUrl: string = 'api/aiRiyouJoukyou';


  constructor(private http: HttpClient, private ankenService: AnkenService) { }


  /**
   *  getAllAiRiyouJoukyous
   *
   *  customerId、ankenIdに一致する全てのAI利用状況情報をDBより取得する
   *  
   *  @param  {number}    customerId
   *  @param  {number}    ankenId
   *  
   *  @return {Observable<Object>} フェッチ
   */
  getAllAiRiyouJoukyous(customerId: number, ankenId:number) {
    return this.http.get(this.routeUrl + '/' + customerId + '/' + ankenId);
  }


  /**
  *  convertAiRiyouJoukyouModels
  *
  *  DBから取得したaiRiyouJoukyousをAI利用状況モデル配列に変換する
  *  
  *
  *  @param  {Array}    aiRiyouJoukyous
  *
  *  @return {AiRiyouJoukyouModel[]} AI利用状況モデル配列
  */
  convertAiRiyouJoukyouModels(aiRiyouJoukyous): AiRiyouJoukyouModel[] {

    var aiRiyouJoukyouModels: AiRiyouJoukyouModel[] = new Array();

    aiRiyouJoukyous.forEach(aiRiyouJoukyou => {

      aiRiyouJoukyouModels.push(this.convertAiRiyouJoukyouModel(aiRiyouJoukyou));
    });

    return aiRiyouJoukyouModels;
  }


  /**
   *  convertAiRiyouJoukyouModel
   *
   *  DBから取得したaiRiyouJoukyouをAI利用状況モデルに変換する
   *  
   *
   *  @param  {object}    aiRiyouJoukyou
   *
   *  @return {AiRiyouJoukyouModel} AI利用状況モデル
   */
  convertAiRiyouJoukyouModel(aiRiyouJoukyou): AiRiyouJoukyouModel {

    var aiRiyouJoukyouModel: AiRiyouJoukyouModel = {
      customerId: aiRiyouJoukyou.customerId,
      ankenId: aiRiyouJoukyou.ankenId,
      year: aiRiyouJoukyou.year,
      month: aiRiyouJoukyou.month,
      tunnelNumber: aiRiyouJoukyou.tunnelNumber,
      souEnchou: aiRiyouJoukyou.souEnchou,
      tankaId: aiRiyouJoukyou.tankaId,
      tanka: aiRiyouJoukyou.tanka,
      kei: aiRiyouJoukyou.souEnchou * aiRiyouJoukyou.tanka,
      ankenName: this.ankenService.selectedAnken ? this.ankenService.selectedAnken.ankenName : ''
    };


    return aiRiyouJoukyouModel;
  }
}
