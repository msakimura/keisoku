import { Injectable } from '@angular/core';
import { Stream } from 'stream';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface TunnelModel {
  fileName: string;
  fileData: File;
}


@Injectable({
  providedIn: 'root'
})
export class TunnelService {

  public tunnelModel: TunnelModel[] = new Array();

  private routeUrl: string = 'api/upload';


  constructor(private http: HttpClient) { }

  upload(file: FormData): Observable<any>{

    return this.http.post(this.routeUrl, file);
  }
}
