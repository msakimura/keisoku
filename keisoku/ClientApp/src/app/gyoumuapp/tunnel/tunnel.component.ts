import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';

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
  
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  uploadFile()
  {
    var blb = new Blob();

    var b: any = blb;
    b.lastModifiedDate = new Date();
    b.name = "C:\Users\manabu_sakimura\Pictures\keisoku\二尾U-005.jpg";

    var file = new File([""], "二尾U-005.jpg");

    var reader = new FileReader();
    reader.onload = function () {
      var buffer = reader.result; // String
    };
    reader.readAsDataURL(file);

   

    let fileToUpload = <File>file;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('api/upload', formData)
      .subscribe();
  }
}
