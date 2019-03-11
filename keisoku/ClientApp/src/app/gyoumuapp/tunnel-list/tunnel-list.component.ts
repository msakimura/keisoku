import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSidenav } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TunnelService, TunnelModel } from 'src/app/services/tunnel.service';

export interface TunnelElement {
  name: string;
  enchou: string;
  yoteiImageNum: number;
  image: number;
  ai: number;
  date: string;
}

export interface Section {
  name: string;
  data: File;
}

const ELEMENT_DATA: TunnelElement[] = [
  { name: 'AAトンネル', enchou: '300m', yoteiImageNum: 31, image: 0, ai: 0, date: '2019/4/1' },
  { name: 'BBトンネル', enchou: '200m', yoteiImageNum: 21, image: 15, ai: 15, date: '2019/4/1' },
  { name: 'CCトンネル', enchou: '500m', yoteiImageNum: 52, image: 26, ai: 2, date: '2019/4/1' },
];

const StringFormat = (str: string, ...args: string[]) =>
  str.replace(/{(\d+)}/g, (match, index) => args[index] || '')

@Component({
  selector: 'app-tunnel-list',
  templateUrl: './tunnel-list.component.html',
  styleUrls: ['./tunnel-list.component.css']
})

export class TunnelListComponent implements OnInit {

  typesOfImages: Section[] = new Array();
 
  tunnelName: string;

  displayedColumns: string[] = ['select', 'name', 'enchou', 'yoteiImageNum', 'image', 'ai', 'date'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  selection = new SelectionModel<TunnelElement>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sidenav') public sideNav: MatSidenav;

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

  constructor(private tunnelService: TunnelService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  saveTunnelInfo() {
    var now = new Date();

    var newData: TunnelElement =
      { name: this.tunnelName, enchou: '100m', yoteiImageNum: this.typesOfImages.length, image: 0, ai: 0, date: StringFormat("{0}/{1}/{2}", now.getFullYear().toString(), now.getMonth().toString(), now.getDay().toString()) }
    ;
    const data = this.dataSource.data;
    data.push(newData);
    this.dataSource.data = data;

    this.sideNav.close();
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    const data = this.typesOfImages;
    for (let file of files) {
      var newData: Section = { name: file.name, data: file };

      data.push(newData);

      
      var tunnelData: TunnelModel = { fileName: file.name, fileData: file };

      this.tunnelService.tunnelModel.push(tunnelData);
    }

    this.typesOfImages = data;
  }
}
