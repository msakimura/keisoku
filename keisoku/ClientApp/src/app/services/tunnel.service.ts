import { Injectable } from '@angular/core';

export interface TunnelModel {
  name: string;
  data: File;
}


@Injectable({
  providedIn: 'root'
})
export class TunnelService {

  public tunnelModel: TunnelModel[] = new Array();

  constructor() { }
}
