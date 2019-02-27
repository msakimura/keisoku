import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { TunnelService } from 'src/app/services/tunnel.service';

export interface TunnelImageElement {
  name: string;
  width: number;
  height: number;
  hibiChushutsu: string;
  sonshou: string;
  hibiBunrui: string;
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
  
  constructor(private router: Router, private http: HttpClient, private tunnelService: TunnelService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  uploadFile()
  {
    const formData = new FormData();

    this.tunnelService.tunnelModel.forEach(function (value) {

      formData.append('uploadFile', value.data, value.name);
    });

    this.http.post('api/upload', formData)
      .subscribe();
  }

  downloadFile() {
    var filename: string = "DXF.dxf";

    var data = this.http.get('/api/download/' + filename)
      .subscribe();

  }
}
