import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface LoginModel {
  loginId: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private signinCaption: string = "サインイン";

  constructor(private http: HttpClient) { }

  /**
   *  login
   *
   *  指定したuserid、passwordでログインする
   *
   *  @param  {string}    userid
   *  @param  {string}    password
   *
   *  @return {Observable<Object>} フェッチ
   */
  login(userid: string, password: string) {

    var body: LoginModel = {
      loginId: userid,
      password: password
    };

    return this.http.post<any>('/api/login', body)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('TokenInfo', JSON.stringify(user));
        }

        return user;
      }));
  }

  /**
   *  logout
   *
   *  TokenInfo（アクセストークン）を削除してログアウトする
   *
   *
   *  @return {void}
   */
  logout() {
    localStorage.removeItem('TokenInfo');
  }

  /**
   *  hasTokenInfo
   *
   *  TokenInfo（アクセストークン）を取得する
   *
   *
   *  @return {void}
   */
  hasTokenInfo() : string{
    return localStorage.getItem('TokenInfo');
  }

  /**
   *  getSignoutCaption
   *
   *  サインイン後のサインインメニューのキャプションを取得する
   *
   *
   *  @return {void}
   */
  getSignoutCaption(): string {
    this.signinCaption = "サインアウト";
    return this.signinCaption;
  }

  /**
   *  getSignoutCaption
   *
   *  サインアウト後のサインインメニューのキャプションを取得する
   *
   *
   *  @return {void}
   */
  getSigninCaption(): string {
    this.signinCaption = "サインイン";
    return this.signinCaption;
  }

  /**
   *  getTokenLoginId
   *
   *  アクセストークンのログインIDを取得する
   *
   *
   *  @return {string} ログインID
   */
  getTokenLoginId(): string {
    var tokenInfo = this.hasTokenInfo();

    if (tokenInfo) {
      const helper = new JwtHelperService();

      var deserialized = JSON.parse(tokenInfo);

      var loginId = deserialized.token;

      const decodedToken = helper.decodeToken(loginId);

      return decodedToken.sub;

    }

    return '';
  }
}
