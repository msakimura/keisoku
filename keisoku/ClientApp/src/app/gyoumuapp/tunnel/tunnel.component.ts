import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { TunnelService } from 'src/app/services/tunnel.service';

export interface TunnelImageElement {
  name: string;
  width: number;
  height: number;
  hibiChushutsu: string;
  sonshou: string;
  hibiBunrui: string;
}

export interface UploadModel {
  tunnelImage: string;
}

const ELEMENT_DATA: TunnelImageElement[] = [
  { name: 'oo-000', width: 4200, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
  { name: 'oo-001', width: 4000, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
  { name: 'oo-002', width: 4200, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
  { name: 'oo-003', width: 4200, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
  { name: 'oo-004', width: 4200, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
  { name: 'oo-005', width: 4200, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
];

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
    const formData = new FormData();

    this.tunnelService.tunnelModel.forEach(function (value) {

      formData.append('file', value.fileData);
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    var reader = new FileReader();

    reader.onload = (e) => {
      
      let bufferOne = Buffer.from(this.tunnelService.tunnelModel[0].fileData);

      var decodedString = String.fromCharCode.apply(null, new Uint16Array(reader.result));
      var obj = JSON.parse(decodedString);

      //this.http.post('api/upload', reader.result)
      //  .subscribe();
    };

    reader.readAsArrayBuffer(this.tunnelService.tunnelModel[0].fileData);

    //this.http.post('api/upload', formData, httpOptions)
    //  .subscribe();

    
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
