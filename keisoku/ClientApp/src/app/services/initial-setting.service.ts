import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InitialSetBunruiId } from '../shared/constant.module';

export interface InitialSettingModel {
  initialSetBunruiId: string;
  initialValue: string;
}

@Injectable({
  providedIn: 'root'
})
export class InitialSettingService {
  public initialSettings: InitialSettingModel[] = new Array();

  private routeUrl: string = 'api/initialsetting';

  constructor(private http: HttpClient) { }


  /**
   *  getAllInitialSetting
   *
   *  DBに登録されている全ての初期設定情報を取得する
   *  
   *
   *  @return {Observable<Object>} フェッチ
   */
  getAllInitialSetting() {
    return this.http.get(this.routeUrl);
  }


  /**
   *  convertInitialSettingModels
   *
   *  DBから取得したinitialSettingsを初期設定モデル配列に変換する
   *  
   *
   *  @param  {Array}    initialSettings
   *
   *  @return {InitialSettingModel[]} 初期設定モデル配列
   */
  convertInitialSettingModels(initialSettings): InitialSettingModel[] {

    var initialSettingModels: InitialSettingModel[] = new Array();

    initialSettings.forEach(initialSetting => {

      initialSettingModels.push(this.convertInitialSettingModel(initialSetting));
    });

    return initialSettingModels;
  }


  /**
   *  convertInitialSettingModel
   *
   *  DBから取得したinitialSettingを初期設定モデルに変換する
   *  
   *
   *  @param  {object}    initialSetting
   *
   *  @return {InitialSettingModel} 初期設定モデル
   */
  convertInitialSettingModel(initialSetting): InitialSettingModel {

    var initialSettingModel: InitialSettingModel = {
      initialSetBunruiId: initialSetting.initialSetBunruiId,
      initialValue: initialSetting.initialValue
    };


    return initialSettingModel;
  }


  /**
   *  getWidthOrHeightInitialSetting
   *
   *  横or幅の初期設定情報を取得する
   *  
   *
   *  @return {InitialSettingModel[]} 初期値
   */
  getWidthOrHeightInitialSetting(): InitialSettingModel[] {

    return this.initialSettings.filter(function (element) {
      return element.initialSetBunruiId === InitialSetBunruiId.WIDTH_OR_HEIGHT;
    });

  }
}
