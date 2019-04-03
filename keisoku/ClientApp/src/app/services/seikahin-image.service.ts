import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SeikahinImageModel {
  seikahinImageId: number;
  imageName: string;
  imageData: string;
  width: number;
  height: number;
  hibiChushutsu: string;
  sonshou: string;
  hibiBunrui: string;

  imageUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class SeikahinImageService {

  private routeUrl: string = 'api/seikahinImage';


  constructor(private http: HttpClient) { }

  /**
   *  insertSeikahinImage
   *
   *  seikahinImageをDBに追加し、seikahinImageの画像をアップロードする
   *  
   *
   *  @param  {SeikahinImageModel}    seikahinImage
   *
   *  @return {Observable<Object>} フェッチ
   */
  insertSeikahinImage(seikahinImage: SeikahinImageModel) {

    return this.http.post(this.routeUrl, seikahinImage);

  }
}
