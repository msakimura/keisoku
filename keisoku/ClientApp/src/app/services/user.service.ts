import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kengen } from '../shared/constant.module';

export interface UserModel {
  customerId: number;
  userId: number;
  loginId: string;
  password: string;
  userName: string;
  email: string;
  kengenFuyos: KengenFuyoModel[];

  customerName: string;
  kanri: string;
  anken: string;
  tunnel: string;
  upload: string;
  download: string;
}

export interface KengenFuyoModel {
  customerId: number;
  userId: number;
  kengenId: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userModels: UserModel[] = new Array();

  public loginUserModel: UserModel;

  private routeUrl: string = 'api/user';

  constructor(private http: HttpClient) { }

  /**
   *  getAllUser
   *
   *  DBに登録されている全てのユーザ情報を取得する
   *  
   *
   *  @return {Observable<Object>} フェッチ
   */
  getAllUser() {
    return this.http.get(this.routeUrl);
  }

  /**
   *  getUserFromLoginId
   *
   *  loginIdに一致するユーザ情報をDBより取得する
   *  
   *  @param  {string}    loginId
   *  
   *  @return {Observable<Object>} フェッチ
   */
  getUserFromLoginId(loginId) {
    return this.http.get(this.routeUrl + '/' + loginId);
  }

  
  /**
   *  insertUser
   *
   *  userをDBに追加する
   *  
   *
   *  @param  {UserModel}    user
   *
   *  @return {Observable<Object>} フェッチ
   */
  insertUser(user: UserModel) {

    return this.http.post(this.routeUrl, user);
  }

  /**
   *  updateUser
   *
   *  userのDBを更新する
   *  
   *
   *  @param  {UserModel}    user
   *
   *  @return {Observable<Object>} フェッチ
   */
  updateUser(user: UserModel) {
    return this.http.put(this.routeUrl, user);
  }

  /**
   *  deleteUsers
   *
   *  userをDBから削除する
   *  
   *
   *  @param  {UserModel}    user
   *
   *  @return {Observable<Object>} フェッチ
   */
  deleteUser(user: UserModel) {
    return this.http.delete(this.routeUrl + '/' + user.customerId + '/' + user.userId);
  }

  /**
   *  convertUserModels
   *
   *  DBから取得したusersをユーザモデル配列に変換する
   *  
   *
   *  @param  {Array}    users
   *
   *  @return {UserModel[]} ユーザモデル配列
   */
  convertUserModels(users): UserModel[] {

    var userModels: UserModel[] = new Array();

    users.forEach(user => {

      userModels.push(this.convertUserModel(user));
    });

    return userModels;
  }


  /**
   *  convertOneUserModels
   *
   *  DBから取得したoneUserをユーザモデル配列に変換する
   *  
   *
   *  @param  {object}    oneUser
   *
   *  @return {UserModel} ユーザモデル
   */
  convertOneUserModels(oneUser): UserModel {

    var userModel: UserModel;

    oneUser.forEach(user => {

      userModel = this.convertUserModel(user);
    });

    return userModel;
  }

  /**
   *  convertUserModel
   *
   *  DBから取得したuserをユーザモデルに変換する
   *  
   *
   *  @param  {object}    user
   *
   *  @return {UserModel} ユーザモデル
   */
  convertUserModel(user): UserModel {

    var kanri = '✕';
    var anken = '✕';
    var tunnel = '✕';
    var upload = '✕';
    var download = '✕';

    var kengenFuyos: KengenFuyoModel[] = new Array();

    var firstUserInfo = user.uGroup[0];
    
    user.uGroup.forEach(u => {

      if (u.kengen) {

        if (u.kengen.kengenName == Kengen.KANRI) {
          kanri = '〇';
        }
        else if (u.kengen.kengenName == Kengen.ANKEN) {
          anken = '〇';
        }
        else if (u.kengen.kengenName == Kengen.TUNNEL) {
          tunnel = '〇';
        }
        else if (u.kengen.kengenName == Kengen.UPLOAD) {
          upload = '〇';
        }
        else if (u.kengen.kengenName == Kengen.DOWNLOAD) {
          download = '〇';
        }

        if (u.kengen.kengenName) {

          var kengenFuyoModel: KengenFuyoModel = {
            customerId: firstUserInfo.user.customerId,
            userId: firstUserInfo.user.userId,
            kengenId: u.kengen.kengenId
          };

          kengenFuyos.push(kengenFuyoModel);

        }

      }
    });

    var userModel: UserModel = {
      customerId: firstUserInfo.user.customerId,
      userId: firstUserInfo.user.userId,
      loginId: firstUserInfo.user.loginId,
      password: firstUserInfo.user.password,
      userName: firstUserInfo.user.userName,
      email: firstUserInfo.user.email,
      kengenFuyos: kengenFuyos,
      customerName: firstUserInfo.customer.customerName,
      kanri: kanri,
      anken: anken,
      tunnel: tunnel,
      upload: upload,
      download: download
    };
    

    return userModel;
  }
  
}
