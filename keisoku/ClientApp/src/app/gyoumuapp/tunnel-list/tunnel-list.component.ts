import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

export interface TunnelElement {
  name: string;
  enchou: string;
  yoteiImageNum: number;
  image: number;
  ai: number;
  date: string;
}

const ELEMENT_DATA: TunnelElement[] = [
  { name: 'AAトンネル', enchou: '300m', yoteiImageNum: 31, image: 0, ai: 0, date: '2019/4/1' },
  { name: 'BBトンネル', enchou: '200m', yoteiImageNum: 21, image: 15, ai: 15, date: '2019/4/1' },
  { name: 'CCトンネル', enchou: '500m', yoteiImageNum: 52, image: 26, ai: 2, date: '2019/4/1' },
];


@Component({
  selector: 'app-tunnel-list',
  templateUrl: './tunnel-list.component.html',
  styleUrls: ['./tunnel-list.component.css']
})
export class TunnelListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'enchou', 'yoteiImageNum', 'image', 'ai', 'date'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  selection = new SelectionModel<TunnelElement>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
