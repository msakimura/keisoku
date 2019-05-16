import { Injectable } from '@angular/core';

export interface DownloadModel {
  id: number;
  fileName: string;
  type: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }
}
