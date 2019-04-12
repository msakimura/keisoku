import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSidenav, MatPaginator, MatSort } from '@angular/material';
import { OsiraseModel } from 'src/app/services/tunnel.service';

@Component({
  selector: 'app-osirase',
  templateUrl: './osirase.component.html',
  styleUrls: ['./osirase.component.css']
})
export class OsiraseComponent implements OnInit {

  @Input('childToSidenav') sideNav: MatSidenav;

  isVaildComponent: boolean = false;

  displayedColumns: string[] = ['name', 'progress', 'icon'];

  dataSource = new MatTableDataSource<OsiraseModel>();


  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;


  constructor() { }

  ngOnInit() {

    const sortingDataAccessor = (data: OsiraseModel, sortHeaderId: string): string | number => {
      if (sortHeaderId === this.displayedColumns[0]) {
        return data.fileName;
      }
      else if (sortHeaderId === this.displayedColumns[1]) {
        return data.message;
      }

      return '';
    };


    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = sortingDataAccessor;

    this.dataSource.sort = this.sort;

  }

  /**
   *  closeSideNav
   *
   *  サイドナビを閉じる
   *  
   *
   *  @return {void}
   */
  closeSideNav() {

    this.sideNav.close();

  }
}
