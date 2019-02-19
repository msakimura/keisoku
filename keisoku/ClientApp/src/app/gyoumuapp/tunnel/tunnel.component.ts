import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

export interface TunnelImageElement {
  name: string;
  width: number;
  height: number;
  hibiChushutsu: string;
  sonshou: string;
  hibiBunrui: string;
}

const ELEMENT_DATA: TunnelImageElement[] = [
  { name: 'oo-001', width: 4000, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
  { name: 'oo-002', width: 4200, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
  { name: 'oo-003', width: 4200, height: 5000, hibiChushutsu: '未', sonshou: '未', hibiBunrui: '未' },
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
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  
}
