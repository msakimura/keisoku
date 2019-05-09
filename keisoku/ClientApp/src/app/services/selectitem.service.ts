import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SelectItemModel {
  selectItemBunruiId: string;
  selectItemId: number;
  selectItemName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SelectitemService {
  public selectItems: SelectItemModel[];

  private routeUrl: string = 'api/selectitem';

  constructor(private http: HttpClient) { }


  /**
   *  getAllSelectItem
   *
   *  DBに登録されている全ての選択項目情報を取得する
   *  
   *
   *  @return {Observable<Object>} フェッチ
   */
  getAllSelectItem() {
    return this.http.get(this.routeUrl);
  }
}
