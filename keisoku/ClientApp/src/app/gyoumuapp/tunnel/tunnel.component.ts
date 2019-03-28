import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { TunnelService } from 'src/app/services/tunnel.service';
import { Observable } from 'rxjs';
import { TunnelImageModel, TunnelImageService, SeikahinImageModel } from 'src/app/services/tunnel-image.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AnkenService } from 'src/app/services/anken.service';
import { Router } from '@angular/router';
import { ValidationModule } from 'src/app/shared/validation.module';
import { Chushutsu } from 'src/app/shared/constant.module';

export function readAsBase64(file): Observable<string> {
  return Observable.create((observable) => {
    const fileReader = new FileReader;

    fileReader.onload = (() => {

      var buffer = fileReader.result as ArrayBuffer;

      var binary = '';
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }


      var value = window.btoa(binary);

      observable.next(value);
      observable.complete();
    });

    fileReader.readAsArrayBuffer(file);
  });
}


@Component({
  selector: 'app-tunnel',
  templateUrl: './tunnel.component.html',
  styleUrls: ['./tunnel.component.css']
})
export class TunnelComponent implements OnInit {

  isDeleteDisabled: boolean = true;

  deleteIconColor = 'diabled';

  isSaveDisabled: boolean = true;

  ankenName: string;

  tunnelName: string;
  
  seikahinImages: SeikahinImageModel[] = [];



  displayedColumns: string[] = ['select', 'name', 'width', 'height', 'hibiChushutsu', 'sonshou', 'hibiBunrui'];

  dataSource = new MatTableDataSource<TunnelImageModel>();

  selection = new SelectionModel<TunnelImageModel>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sidenavpreview') public sideNavPreview: MatSidenav;

  @ViewChild('sidenavimage') public sideNavImage: MatSidenav;

  @ViewChild(MatSort) sort: MatSort;



  constructor(private router: Router, private http: HttpClient, private ankenService: AnkenService, private tunnelService: TunnelService, private tunnelImageService: TunnelImageService) { }

  ngOnInit() {
    if (this.ankenService.selectedAnken && this.tunnelService.selectedTunnel) {

      this.ankenName = this.ankenService.selectedAnken.ankenName;

      this.tunnelName = this.tunnelService.selectedTunnel.tunnelName;

      this.bindAllTunnelImageInfo();
    }
    else {

      this.showHome();
    }
  }


  /**
   *  applyFilterImageName
   *
   *  画像名をfilterValueでフィルタする
   *  
   *  @param  {string}    filterValue
   *  
   *  @return {void}
   */
  applyFilterImageName(filterValue: string) {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.seikahinImage.imageName.toLowerCase().includes(filter);
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

    this.changeDisabled();
  }


  /**
   *  selectToggle
   *
   *  レコードrowのチェックボックスの選択有無を切り替える
   *  
   *  @param  {object}    row
   *
   *  @return {boid}
   */
  selectToggle(row) {
    this.selection.toggle(row);

    this.changeDisabled();
  }

  /**
   *  changeDisabled
   *
   *  レコードのチェックボックス選択数によって、削除ボタンの活性/不活性を切り替える
   *  
   *
   *  @return {boid}
   */
  changeDisabled() {
    this.isDeleteDisabled = true;

    this.deleteIconColor = 'diabled';

    const numSelected = this.selection.selected.length;

    if (numSelected >= 1) {
      
      this.isDeleteDisabled = false;

      this.deleteIconColor = 'primary';

    }
  }


  /**
   *  bindAllTunnelImageInfo
   *
   *  selectedTunnelに紐付く全てのトンネル画像情報をdataSourceにバインドする
   *  
   *  
   *  @return {void}
   */
  bindAllTunnelImageInfo() {

    this.tunnelImageService.getAllTunnelImage(this.tunnelService.selectedTunnel.customerId, this.tunnelService.selectedTunnel.ankenId, this.tunnelService.selectedTunnel.tunnelId)
      .subscribe((response: any) => {

        this.dataSource.data = this.tunnelImageService.convertTunnelImageModels(response);

        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;
      },
      error => {
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;
      });
  }


  /**
   *  selectTunnelImageInfo
   *
   *  選択したトンネル画像をdatasourceに追加する
   *  
   *
   *  @return {void}
   */
  selectTunnelImageInfo() {

    var tunnelImages = this.getSelectedTunnelImageModels();

    this.dataSource.data = tunnelImages;

    this.closeSideNavImage();
  }


  /**
   *  deleteTunnelImageInfo
   *
   *  選択したトンネル画像情報をdatasourceから削除する
   *  
   *
   *  @return {void}
   */
  deleteTunnelImageInfo() {

    var data = this.dataSource.data;

    this.selection.selected.forEach(image => {

      data = data.filter(function (element) { return (element.customerId != image.customerId || element.ankenId != image.ankenId || element.tunnelId != image.tunnelId || element.tunnelImageId != image.tunnelImageId); });
    });

    this.dataSource.data = data;

    this.selection.clear();

    this.changeDisabled();
  }


  /**
   *  uploadTunnelImageInfo
   *
   *  アップロードするトンネル画像情報をDBに保存する
   *  
   *
   *  @return {void}
   */
  uploadTunnelImageInfo() {
    
    this.tunnelImageService.insertTunnelImages(this.dataSource.data);
  }

  uploadFile()
  {
    
    //for (var i = 0; i < this.tunnelService.tunnelModel.length; i++)
    //{
    //  var fileReader = readAsBase64(this.tunnelService.tunnelModel[i].fileData);

    //  fileReader.subscribe((data: string) => {

    //    var model: UploadModel = { fileName: this.tunnelService.tunnelModel[0].fileName, fileData: data };

    //    this.http.post('api/upload', model).subscribe(result => { console.log("アップロード完了") });
    //  });
    //}
    
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


  /**
   *  showHome
   *
   *  メインフレームに案件一覧画面を表示する
   *  
   *
   *  @return {void}
   */
  showHome() {
    this.router.navigate(["/gyoumu"]);
  }


  /**
   *  closeSideNavPreview
   *
   *  プレビューのサイドナビを閉じる
   *  
   *
   *  @return {void}
   */
  closeSideNavPreview() {
    this.sideNavPreview.close();

  }

  /**
   *  closeSideNavImage
   *
   *  画像選択のサイドナビを閉じる
   *  
   *
   *  @return {void}
   */
  closeSideNavImage() {
    this.sideNavImage.close();

  }


  /**
   *  displaySideNavImage
   *
   *  画像選択のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displaySideNavImage() {
    this.clearSideNavImageFormData();

    this.sideNavImage.open();
  }


  /**
   *  clearSideNavImageFormData
   *
   *  sideNavImageのフォームデータをクリアする
   *  
   *
   *  @return {void}
   */
  clearSideNavImageFormData() {

    this.seikahinImages = [];
  }


  /**
   *  addTunnelImages
   *
   *  選択したトンネル画像：filesをtunnelImagesに追加する
   *  
   *  @param  {File[]}    files
   *  
   *  @return {void}
   */
  async addTunnelImages(files) {

    if (files.length === 0) {
      return;
    }
    
    for (var i = 0; i < files.length; i++) {
      var isImage = ValidationModule.isImage(files[i]);

      if (isImage) {

        var target = this.seikahinImages.find(seikahinImage => {
          return (seikahinImage.imageName == files[i].name);
        });

        if (!target) {

          
          await this.addSeikahinImageModel(files[i], i == files.length-1);

        }
      }
    }
  }


  /**
   *  addSeikahinImageModel
   *
   *  fileを元にSeikahinImageModelを作成し、seikahinImagesに追加する
   *  
   *  @param  {File}    file
   *  
   *  @return {void}
   */
  async addSeikahinImageModel(file: File, isLastFile: boolean) {

    const reader = new FileReader();

    reader.onload = () => {

      const img = new Image();

      img.onload = () => {

        var url = img.src.substr(img.src.indexOf(',') + 1);

        var seikahinImageModel: SeikahinImageModel = {
          seikahinImageId: 0,
          imageName: file.name,
          imageData: url,
          width: img.width,
          height: img.height,
          hibiChushutsu: Chushutsu.NONE,
          sonshou: Chushutsu.NONE,
          hibiBunrui: Chushutsu.NONE
        };

        this.seikahinImages.push(seikahinImageModel);

        this.isSaveDisabled = isLastFile;
      };

      img.src = reader.result as string;

    };

    reader.readAsDataURL(file);
  }


  /**
   *  getSelectedTunnelImageModels
   *
   *  選択したトンネル画像のモデルを取得する
   *  
   *
   *  @return {TunnelImageModel} トンネル画像情のモデルリスト
   */
  getSelectedTunnelImageModels(): TunnelImageModel[] {

    var tunnelImageModels: TunnelImageModel[] = [];

    var tunnelImageId = 0;
    
    
    this.seikahinImages.forEach(seikahinImage => {
      
      var tunnelImageModel: TunnelImageModel = {
        customerId: this.tunnelService.selectedTunnel.customerId,
        ankenId: this.tunnelService.selectedTunnel.ankenId,
        tunnelId: this.tunnelService.selectedTunnel.tunnelId,
        tunnelImageId: tunnelImageId,
        seikahinImageId: 0,
        seikahinImage: seikahinImage
      };

      tunnelImageId++;

      tunnelImageModels.push(tunnelImageModel);

    });

    

    return tunnelImageModels;
  }
}
