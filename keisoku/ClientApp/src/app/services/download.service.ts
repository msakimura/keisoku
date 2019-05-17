import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface DownloadModel {
  id: number;
  fileName: string;
  fileType: string;
  fileData: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  public downloadModel: DownloadModel[] = new Array();

  private routeUrl: string = 'api/download';

  constructor(private http: HttpClient) { }

  /**
  *  getDownload
  *
  *  customerId、ankenId、tunnelIdに一致するダウンロード情報をDBより取得する
  *
  *
  *  @return {Observable<Object>} フェッチ
  */
  getZipFile(models: DownloadModel[]) {

    let params = new HttpParams()
      .set("param", JSON.stringify(models));

    return this.http.get(this.routeUrl, { params: params, responseType: 'blob' });
  }


  /**
   *  getDownload
   *
   *  customerId、ankenId、tunnelIdに一致するダウンロード情報をDBより取得する
   *
   *  @param  {number}    customerId
   *  @param  {number}    ankenId
   *  @param  {number}    tunnelId
   *
   *  @return {Observable<Object>} フェッチ
   */
  getDownload(customerId: number, ankenId: number, tunnelId: number) {
    return this.http.get(this.routeUrl + '/' + customerId + '/' + ankenId + '/' + tunnelId);
  }

}
