import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface LoginModel {
  loginId: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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
}
