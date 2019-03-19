import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerModel } from './customer.service';
import { KengenModel } from './kengen.service';
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

    return this.http.put(this.routeUrl + '/' + user.customerId + '/' + user.userId, user);
  }

  /**
   *  deleteUsers
   *
   *  usersをDBから削除する
   *  
   *
   *  @param  {Array}    users
   *
   *  @return {Observable<Object>} フェッチ
   */
  deleteUsers(user: UserModel) {
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
   *  convertUserModels
   *
   *  DBから取得したuserをユーザモデルに変換する
   *  
   *
   *  @param  {Array}    users
   *
   *  @return {UserModel} ユーザモデル
   */
  convertUserModel(user): UserModel {

    var kannri = '✕';
    var anken = '✕';
    var tunnel = '✕';
    var upload = '✕';
    var download = '✕';

    var kengenFuyos: KengenFuyoModel[] = new Array();

    if (user.kengenFuyos != null) {
      user.kengenFuyos.forEach(kengenFuyo => {

        if (kengenFuyo.kengen.kengenName == Kengen.KANRI) {
          kannri = '〇';
        }
        else if (kengenFuyo.kengen.kengenName == Kengen.ANKEN) {
          anken = '〇';
        }
        else if (kengenFuyo.kengen.kengenName == Kengen.TUNNEL) {
          tunnel = '〇';
        }
        else if (kengenFuyo.kengen.kengenName == Kengen.UPLOAD) {
          upload = '〇';
        }
        else if (kengenFuyo.kengen.kengenName == Kengen.DOWNLOAD) {
          download = '〇';
        }


        var kengenFuyoModel: KengenFuyoModel = {
          customerId: kengenFuyo.customerId,
          userId: kengenFuyo.userId,
          kengenId: kengenFuyo.kengenId
        };

        kengenFuyos.push(kengenFuyoModel);
      });
    }

    var userModel: UserModel = {
      customerId: user.customerId,
      userId: user.userId,
      loginId: user.loginId,
      password: user.password,
      userName: user.userName,
      email: user.email,
      kengenFuyos: kengenFuyos,
      customerName: user.customer.customerName,
      kanri: kannri,
      anken: anken,
      tunnel: tunnel,
      upload: upload,
      download: download
    };
    

    return userModel;
  }
}
