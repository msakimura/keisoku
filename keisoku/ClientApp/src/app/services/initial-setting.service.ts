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

  /**
   *  getLengthMInitialSetting
   *
   *  長さ(m)の初期設定情報を取得する
   *  
   *
   *  @return {InitialSettingModel[]} 初期値
   */
  getLengthMInitialSetting(): InitialSettingModel[] {

    return this.initialSettings.filter(function (element) {
      return element.initialSetBunruiId === InitialSetBunruiId.LENGTH_M;
    });

  }

  /**
   *  getKitenKiroteiInitialSetting
   *
   *  起点の距離程の初期設定情報を取得する
   *  
   *
   *  @return {InitialSettingModel[]} 初期値
   */
  getKitenKiroteiInitialSetting(): InitialSettingModel[] {

    return this.initialSettings.filter(function (element) {
      return element.initialSetBunruiId === InitialSetBunruiId.KITEN_KIROTEI;
    });

  }

  /**
   *  getImageAlignPositionInitialSetting
   *
   *  画像揃え位置の初期設定情報を取得する
   *  
   *
   *  @return {InitialSettingModel[]} 初期値
   */
  getImageAlignPositionInitialSetting(): InitialSettingModel[] {

    return this.initialSettings.filter(function (element) {
      return element.initialSetBunruiId === InitialSetBunruiId.IMAGE_ALIGN_POSITION;
    });

  }


  /**
   *  getShortLineRemoveInitialSetting
   *
   *  単線削除の初期設定情報を取得する
   *  
   *
   *  @return {InitialSettingModel[]} 初期値
   */
  getShortLineRemoveInitialSetting(): InitialSettingModel[] {

    return this.initialSettings.filter(function (element) {
      return element.initialSetBunruiId === InitialSetBunruiId.SHORT_LINE_REMOVE;
    });

  }


  /**
   *  getKaikouhabaMojiSizeInitialSetting
   *
   *  開口幅文字サイズの初期設定情報を取得する
   *  
   *
   *  @return {InitialSettingModel[]} 初期値
   */
  getKaikouhabaMojiSizeInitialSetting(): InitialSettingModel[] {

    return this.initialSettings.filter(function (element) {
      return element.initialSetBunruiId === InitialSetBunruiId.KAIKOUHABA_MOJI_SIZE;
    });

  }


  /**
   *  getImageCompressionRateInitialSetting
   *
   *  画像圧縮率の初期設定情報を取得する
   *  
   *
   *  @return {InitialSettingModel[]} 初期値
   */
  getImageCompressionRateInitialSetting(): InitialSettingModel[] {

    return this.initialSettings.filter(function (element) {
      return element.initialSetBunruiId === InitialSetBunruiId.IMAGE_COMPRESSION_RATIO;
    });

  }


  /**
   *  getPrintLayoutTopSpaceInitialSetting
   *
   *  印刷レイアウト上余白の初期設定情報を取得する
   *  
   *
   *  @return {InitialSettingModel[]} 初期値
   */
  getPrintLayoutTopSpaceInitialSetting(): InitialSettingModel[] {

    return this.initialSettings.filter(function (element) {
      return element.initialSetBunruiId === InitialSetBunruiId.PRINT_LAYOUT_TOP_SPACE;
    });

  }


  /**
   *  getPrintLayoutBottompSpaceInitialSetting
   *
   *  印刷レイアウト下余白の初期設定情報を取得する
   *  
   *
   *  @return {InitialSettingModel[]} 初期値
   */
  getPrintLayoutBottompSpaceInitialSetting(): InitialSettingModel[] {

    return this.initialSettings.filter(function (element) {
      return element.initialSetBunruiId === InitialSetBunruiId.PRINT_LAYOUT_BOTTOM_SPACE;
    });

  }


  /**
   *  getSpanMojiSizeInitialSetting
   *
   *  スパン文字の大きさの初期設定情報を取得する
   *  
   *
   *  @return {InitialSettingModel[]} 初期値
   */
  getSpanMojiSizeInitialSetting(): InitialSettingModel[] {

    return this.initialSettings.filter(function (element) {
      return element.initialSetBunruiId === InitialSetBunruiId.SPAN_MOJI_SIZE;
    });

  }
}
