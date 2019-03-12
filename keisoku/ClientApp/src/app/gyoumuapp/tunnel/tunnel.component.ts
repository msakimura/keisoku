import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient, HttpEventType, HttpHeaders, HttpEvent } from '@angular/common/http';
import { TunnelService, TunnelModel } from 'src/app/services/tunnel.service';
import { ArrayBuffer } from '@angular/http/src/static_request';
import { Observable, ReplaySubject } from 'rxjs';

export interface TunnelImageElement {
  name: string;
  width: number;
  height: number;
  hibiChushutsu: string;
  sonshou: string;
  hibiBunrui: string;
}

export interface UploadModel {
  fileName: string;
  fileData: string;
}

const ELEMENT_DATA: TunnelImageElement[] = [
  { name: 'oo-000', width: 4200, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
  { name: 'oo-001', width: 4000, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
  { name: 'oo-002', width: 4200, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
  { name: 'oo-003', width: 4200, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
  { name: 'oo-004', width: 4200, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
  { name: 'oo-005', width: 4200, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
];

export function readAsBase64(file): Observable<string> {
  return Observable.create((observable) => {
    const fileReader = new FileReader;

    fileReader.onload = (() => {

      var buffer = fileReader.result as ArrayBuffer;

      var binary = '';
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }


      var value = window.btoa(binary);

      observable.next(value);
      observable.complete();
    });

    fileReader.readAsArrayBuffer(file);
  });
}


@Component({
  selector: 'app-tunnel',
  templateUrl: './tunnel.component.html',
  styleUrls: ['./tunnel.component.css']
})
export class TunnelComponent implements OnInit {
  displayedColumns: string[] = ['name', 'width', 'height', 'hibiChushutsu', 'sonshou', 'hibiBunrui'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  constructor(private http: HttpClient, private tunnelService: TunnelService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  uploadFile()
  {
    
    for (var i = 0; i < this.tunnelService.tunnelModel.length; i++)
    {
      var fileReader = readAsBase64(this.tunnelService.tunnelModel[i].fileData);

      fileReader.subscribe((data: string) => {

        var model: UploadModel = { fileName: this.tunnelService.tunnelModel[0].fileName, fileData: data };

        this.http.post('api/upload', model).subscribe(result => { console.log("アップロード完了") });
      });
    }
    
  }



  async downloadFile() {
    var filename: string = "DWG.dwg";

    await this.http.get('/api/download/' + filename, { responseType: 'blob' })
      .subscribe(res => {
        var a = document.createElement("a");

        a.href = URL.createObjectURL(res);
        a.download = filename;
        // start download
        a.click();
      });
    
  }
  
}
