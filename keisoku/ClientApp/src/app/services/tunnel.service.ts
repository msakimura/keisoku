import { Injectable } from '@angular/core';
import { Stream } from 'stream';

export interface TunnelModel {
  fileName: string;
  fileData: File;
}


@Injectable({
  providedIn: 'root'
})
export class TunnelService {

  public tunnelModel: TunnelModel[] = new Array();

  constructor() { }
}
