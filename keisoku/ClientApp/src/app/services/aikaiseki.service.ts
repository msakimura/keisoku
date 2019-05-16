import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AiKaisekiModel {
  customerId: number;
  ankenId: number;
  tunnelId: number;
  aiKaisekiCadId: number;
  aiKaisekiPdfId: number;

  aiKaisekiCadModel: AiKaisekiCadModel;
  aiKaisekiPdfModel: AiKaisekiPdfModel;
}


export interface AiKaisekiCadModel {
  aiKaisekiCadId: number;
  cadName: string;
  cadData: string;
  blobContainerName: string;
  createdAt: Date;
}

export interface AiKaisekiPdfModel {
  aiKaisekiPdfId: number;
  pdfName: string;
  pdfData: string;
  blobContainerName: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AikaisekiService {

  public aiKaisekiModel: AiKaisekiModel;

  private routeUrl: string = 'api/aikaiseki';

  constructor(private http: HttpClient) { }


  /**
   *  getAiKaiseki
   *
   *  customerId、ankenId、tunnelIdに一致するAI解析情報をDBより取得する
   *  
   *  @param  {number}    customerId
   *  @param  {number}    ankenId
   *  @param  {number}    tunnelId
   *  
   *  @return {Observable<Object>} フェッチ
   */
  getAiKaiseki(customerId: number, ankenId: number, tunnelId: number) {
    return this.http.get(this.routeUrl + '/' + customerId + '/' + ankenId + '/' + tunnelId);
  }

}
