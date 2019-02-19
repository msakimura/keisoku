import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

export interface AnkenElement {
  name: string;
  tunnel: number;
  image: number;
  cad: number;
  date: string;
}

const ELEMENT_DATA: AnkenElement[] = [
  { name: 'XX工事', tunnel: 5, image: 2, cad: 1, date: '2019/4/1' },
  { name: 'XY工事', tunnel: 3, image: 3, cad: 3, date: '2019/4/1' },
  { name: 'XZ工事', tunnel: 3, image: 3, cad: 3, date: '2019/4/1' },
];


@Component({
  selector: 'app-anken-list',
  templateUrl: './anken-list.component.html',
  styleUrls: ['./anken-list.component.css']
})
export class AnkenListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'tunnel', 'image', 'cad', 'date'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  selection = new SelectionModel<AnkenElement>(true, []);

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

  constructor(private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  
}
