import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface PasswordModel {
  loginId: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private routeUrl: string = 'api/password';

  constructor(private http: HttpClient) { }


  /**
   *  updatePassword
   *
   *  identyuserのpasswordを更新する
   *  
   *
   *  @param  {PasswordModel}    password
   *
   *  @return {Observable<Object>} フェッチ
   */
  updatePassword(password: PasswordModel) {
    return this.http.put(this.routeUrl, password);
  }
}
