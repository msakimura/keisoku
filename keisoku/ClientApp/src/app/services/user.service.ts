import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerModel } from './customer.service';
import { KengenModel } from './kengen.service';

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
}
