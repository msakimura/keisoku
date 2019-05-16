import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSidenav, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DownloadModel } from 'src/app/services/download.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'type', 'date'];


  dataSource = new MatTableDataSource<DownloadModel>();


  @Input('childToSidenav') sideNav: MatSidenav;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;


  constructor() { }

  ngOnInit() {
    const sortingDataAccessor = (data: DownloadModel, sortHeaderId: string): string | number => {
      if (sortHeaderId === this.displayedColumns[1]) {
        return data.fileName;
      }
      else if (sortHeaderId === this.displayedColumns[2]) {
        return data.type;

      }
      else if (sortHeaderId === this.displayedColumns[3]) {
        return data.createdAt.toString();

      }

      // Ignore other headers
      return '';
    };


    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = sortingDataAccessor;

    this.dataSource.sort = this.sort;
  }


  /**
   *  initialize
   *
   *  初期設定する
   *  
   *  
   *  @return {void}
   */
  initialize() { }


  /**
   *  destroy
   *
   *  入力項目を破棄する
   *  
   *  
   *  @return {void}
   */
  destroy() { }


  /**
   *  applyFilterFileName
   *
   *  ファイル名をfilterValueでフィルタする
   *  
   *  @param  {string}    filterValue
   *  
   *  @return {void}
   */
  applyFilterFileName(filterValue: string) {

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.fileName.toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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


  kakuteiDownload() {}
}
