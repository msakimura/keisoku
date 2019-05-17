import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSidenav, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DownloadModel, DownloadService } from 'src/app/services/download.service';
import { AikaisekiService } from 'src/app/services/aikaiseki.service';
import { TunnelService } from 'src/app/services/tunnel.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FileAtribute } from 'src/app/shared/constant.module';
import { TunnelImageService } from 'src/app/services/tunnel-image.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'type', 'date'];


  dataSource = new MatTableDataSource<DownloadModel>();

  downloadModels: DownloadModel[] = new Array();

  selection = new SelectionModel<DownloadModel>(true, []);


  @Input('childToSidenav') sideNav: MatSidenav;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;


  constructor(private aikaisekiService: AikaisekiService,
    private tunnelService: TunnelService,
    private downloadService: DownloadService,
    private tunnelImageService: TunnelImageService) { }

  ngOnInit() {
    const sortingDataAccessor = (data: DownloadModel, sortHeaderId: string): string | number => {
      if (sortHeaderId === this.displayedColumns[1]) {
        return data.fileName;
      }
      else if (sortHeaderId === this.displayedColumns[2]) {
        return data.fileType;

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
   *  isAllSelected
   *
   *  全てのチェックボックスが選択されているか判定する
   *  
   *
   *  @return {boolean} 判定結果
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   *  masterToggle
   *
   *  ヘッダーのチェックボックス選択時、全レコードのチェックボックスの選択有無を切り替える
   *  
   *
   *  @return {boid}
   */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }



  /**
   *  initialize
   *
   *  初期設定する
   *  
   *  
   *  @return {void}
   */
  initialize() {

    this.bindAiKaiseki();

    this.bindTunnelImage();

    this.dataSource.data.sort(function (a, b) {

      if (a.createdAt < b.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;

      return 0;
    });
  }


  /**
   *  destroy
   *
   *  入力項目を破棄する
   *  
   *  
   *  @return {void}
   */
  destroy() {

    this.dataSource.data = [];

    this.downloadModels = [];
  }


  /**
   *  bindAiKaiseki
   *
   *  customerId、ankenId、tunnelIdに紐付くAI解析情報をdataSourceにバインドする
   *  
   *  
   *  @return {void}
   */
  bindAiKaiseki() {

    const selectedTunnel = this.tunnelService.selectedTunnel;

    this.aikaisekiService.getAiKaiseki(selectedTunnel.customerId, selectedTunnel.ankenId, selectedTunnel.tunnelId)
      .subscribe((response: any) => {
        
        var aikaisekiDownloadModels = this.aikaisekiService.convertDownloadModelFromAiKaiseki(response);

        aikaisekiDownloadModels.forEach(model => {
          this.downloadModels.push(model);
        });

        this.dataSource.data = this.downloadModels;

      },
      error => {

      });
    
  }

  /**
   *  bindTunnelImage
   *
   *  customerId、ankenId、tunnelIdに紐付くトンネル画像情報をdataSourceにバインドする
   *  
   *  
   *  @return {void}
   */
  bindTunnelImage() {

    const selectedTunnel = this.tunnelService.selectedTunnel;

    this.tunnelImageService.getAllTunnelImage(selectedTunnel.customerId, selectedTunnel.ankenId, selectedTunnel.tunnelId)
      .subscribe((response: any) => {

        var aikaisekiDownloadModels = this.aikaisekiService.convertDownloadModelFromTunnelImages(response);

        aikaisekiDownloadModels.forEach(model => {
          this.downloadModels.push(model);
        });

        this.dataSource.data = this.downloadModels;

      },
        error => {

        });

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


  /**
   *  kakuteiDownload
   *
   *  チェックしたファイルをダウンロードする
   *  
   *
   *  @return {void}
   */
  kakuteiDownload() {

    var downloadModels = this.getCheckDownloadModels();

    this.downloadService.getZipFile(downloadModels)
      .subscribe(response => {
        
        var a = document.createElement("a");

        a.href = URL.createObjectURL(response);
        a.download = FileAtribute.DOWNLOAD_FILE_NAME;
        // start download
        a.click();

      },
      error => {
        
      });
  }

  
  /**
   *  getCheckDownloadModels
   *
   *  チェックしたレコードのダウンロード情報を取得する
   *  
   *
   *  @return {DownloadModel} ダウンロード情報配列
   */
  getCheckDownloadModels(): DownloadModel[] {
    
    var downloadModels: DownloadModel[] = new Array();

    this.selection.selected.forEach(row => {

      var downloadModel: DownloadModel = {
        id: row.id,
        fileName: row.fileName,
        fileType: row.fileType,
        fileData: row.fileData,
        createdAt: row.createdAt
      };

      downloadModels.push(downloadModel);

    });
    
    return downloadModels;
  }
}
