import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface KengenModel {
  kengenId: number;
  kengenName: string;
}

@Injectable({
  providedIn: 'root'
})
export class KengenService {

  public kengenModels: KengenModel[] = new Array();

  private routeUrl: string = 'api/kengen';

  constructor(private http: HttpClient) { }

  /**
   *  getAllKengen
   *
   *  DBに登録されている全ての権限情報を取得する
   *  
   *
   *  @return {Observable<Object>} フェッチ
   */
  getAllKengen() {
    return this.http.get(this.routeUrl);
  }
}
