import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSidenav, MatSort, MatSnackBar, MatSnackBarRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { TunnelService } from 'src/app/services/tunnel.service';
import { TunnelImageModel, TunnelImageService } from 'src/app/services/tunnel-image.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AnkenService } from 'src/app/services/anken.service';
import { Router } from '@angular/router';
import { ValidationModule } from 'src/app/shared/validation.module';
import { Chushutsu, TunnelImage } from 'src/app/shared/constant.module';
import { NotificationsnackbarComponent } from 'src/app/components/notificationsnackbar/notificationsnackbar.component';
import { SeikahinImageModel, SeikahinImageService } from 'src/app/services/seikahin-image.service';
import { findIndex } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';


@Component({
  selector: 'app-tunnel',
  templateUrl: './tunnel.component.html',
  styleUrls: ['./tunnel.component.css']
})
export class TunnelComponent implements OnInit {

  isSideNavImage: boolean = false;

  isSideNavPreview: boolean = false;

  isSideNavAiRiyoujoukyou: boolean = false;


  isImageProgress: boolean = false;

  isLoadPreviewImageProgress: boolean = false;

  isDeleteDisabled: boolean = true;

  isSaveDisabled: boolean = true;

  isPrevImageDisabled: boolean = true;

  isNextImageDisabled: boolean = true;

  isUploadDisabled: boolean = true;

  isDownloadDisabled: boolean = true;

  isDaichouDisabled: boolean = true;

  isPrintDisabled: boolean = true;

  isSummaryDisabled: boolean = true;


  deleteIconColor = 'diabled';

  saveIconColor = 'diabled';

  prevImageIconColor = 'disabled';

  nextImageIconColor = 'disabled';

  uploadIconColor = 'disabled';

  downloadIconColor = 'disabled';

  daichouIconColor = 'disabled';

  printIconColor = 'disabled';

  summaryIconColor = 'disabled';


  addImageMessage = TunnelImage.ADD_IMAGE;

  loadPreviewImageMessage = TunnelImage.LOAD_PREVIEWIMAGE;


  ankenName: string;

  tunnelName: string;
  
  seikahinImages: SeikahinImageModel[] = [];

  previewImages: string[] = [];

  selectedImageNumber: number;

  readImageNumber: number;

  previewImageName: string;

  basePreviewImageIndex: number;


  message: string;
  

  displayedColumns: string[] = ['select', 'name', 'width', 'height', 'hibiChushutsu', 'sonshou', 'hibiBunrui'];

  dataSource = new MatTableDataSource<TunnelImageModel>();

  selection = new SelectionModel<TunnelImageModel>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  @ViewChild(MatSort) sort: MatSort;
  
  
  constructor(private router: Router,
    private http: HttpClient,
    private ankenService: AnkenService,
    private tunnelService: TunnelService,
    private tunnelImageService: TunnelImageService,
    private seikahinImageService: SeikahinImageService,
    private snackBar: MatSnackBar) { }


  ngOnInit() {

    const sortingDataAccessor = (data: TunnelImageModel, sortHeaderId: string): string | number => {
      if (sortHeaderId === this.displayedColumns[1]) {
        return data.seikahinImage.imageName;
      }
      else if (sortHeaderId === this.displayedColumns[2]) {
        return data.seikahinImage.width;

      }
      else if (sortHeaderId === this.displayedColumns[3]) {
        return data.seikahinImage.height;

      }
      else if (sortHeaderId === this.displayedColumns[4]) {
        return data.seikahinImage.hibiChushutsu;

      }
      else if (sortHeaderId === this.displayedColumns[5]) {
        return data.seikahinImage.sonshou;

      }
      else if (sortHeaderId === this.displayedColumns[6]) {
        return data.seikahinImage.hibiBunrui;

      }

      // Ignore other headers
      return '';
    };



    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = sortingDataAccessor;

    this.dataSource.sort = this.sort;


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
   *  @return {void}
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
   *  @return {void}
   */
  selectToggle(row) {

    if (this.sideNav.opened) return;

    this.selection.toggle(row);

    this.changeDisabled();
    
  }

  /**
   *  changeDisabled
   *
   *  レコードのチェックボックス選択数によって、ボタンの活性/不活性を切り替える
   *  
   *
   *  @return {void}
   */
  changeDisabled() {
    this.switchDisabledDeleteButton(true);

    this.switchDisabledUploadButton(true);


    const numSelected = this.selection.selected.length;

    if (numSelected >= 1) {
      
      this.switchDisabledDeleteButton(false);

      this.switchDisabledUploadButton(false);
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

        this.dataSource.data.forEach(data => {

          this.seikahinImages.push(data.seikahinImage);
        });
        

      },
      error => {
      });
  }


  /**
   *  addDatasourceTunnelImage
   *
   *  トンネル画像をdatasourceに追加する
   *  
   *
   *  @return {void}
   */
  addDatasourceTunnelImage() {

    this.seikahinImages.sort(function (a, b) {

      if (a.imageName < b.imageName) return -1;
      if (a.imageName > b.imageName) return 1;

      return 0;
    });

    var tunnelImages = this.getSelectedTunnelImageModels();

    this.dataSource.data = tunnelImages;

    this.closeSideNav();

    this.selection.clear();
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

    this.selection.selected.forEach(image => {
      this.tunnelImageService.deleteTunnelImage(image).subscribe(
        data => { },
        error => {
        });
    });

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

    this.message = 'アップロード開始';
    
    this.selection.selected.forEach(image => {

      if (image.tunnelImageId === 0) {

        this.seikahinImageService.insertSeikahinImage(image.seikahinImage)
          .subscribe((response: any) => {

            this.message = image.seikahinImage.imageName;

            var target = this.dataSource.data.find(data => {
              return (data.seikahinImage && data.seikahinImage.imageName === response.imageName);
            });

            target.seikahinImageId = response.seikahinImageId;
            target.seikahinImage = null;

            this.tunnelImageService.insertTunnelImage(target)
              .subscribe((response: any) => {

                this.message = 'アップロード完了';
                console.log('アップロード完了');

                target.tunnelImageId = response.tunnelImageId;
                
              },
                error => {

                  console.log('アップロード失敗');
                });

          },
            error => {

          });

      }
      
    });
    
  }
  

  /**
   *  downloadFile
   *
   *  
   *  
   *
   *  @return {void}
   */
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
   *  displaySideNavImage
   *
   *  画像追加のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displaySideNavImage() {

    this.isSideNavImage = true;

    this.isSideNavPreview = false;

    this.switchDisabledSaveButton(true);

    this.clearSideNavFormData();

    this.addSeikahinImagesFromDataSource();

    this.sideNav.open();
  }



  /**
   *  displaySideNavPreview
   *
   *  選択したrow(画像名)について、プレビューのサイドナビを表示する
   *  
   *  @param  {object}    row
   *  
   *  @return {void}
   */
  displaySideNavPreview(row) {
    this.isSideNavImage = false;

    this.isSideNavPreview = true;

    this.previewImageName = row.seikahinImage.imageName;

    this.initPreviewSideNav();

    this.sideNav.open();
    
    
  }



  /**
   *  displaySideNavAiRiyoujoukyou
   *
   *  AI利用状況のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displaySideNavAiRiyoujoukyou() {

    this.isSideNavImage = false;

    this.isSideNavPreview = false;

    this.isSideNavAiRiyoujoukyou = true;
    
    this.sideNav.open();
  }



  /**
   *  clearSideNavFormData
   *
   *  sideNavのフォームデータをクリアする
   *  
   *
   *  @return {void}
   */
  clearSideNavFormData() {
    
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
   addTunnelImages(files) {
    
    if (files.length === 0) {
      return;
    }

    var targetFiles: File[] = [];

    for (var i = 0; i < files.length; i++) {
      var isImage = ValidationModule.isImage(files[i]);

      if (!isImage) continue;

      var target = this.seikahinImages.find(seikahinImage => {
        return (seikahinImage.imageName === files[i].name);
      });

      if (!target) {

        targetFiles.push(files[i]);
      }
    }

    if (targetFiles.length === 0) {
      return;
    }

    this.isImageProgress = true;

    this.selectedImageNumber = targetFiles.length;

    this.readImageNumber = 0;

    targetFiles.forEach(async file => {

      this.addSeikahinImageModel(file);

    });
    
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
  addSeikahinImageModel(file: File) {

    const reader = new FileReader();

    reader.onload = () => {

      const url = reader.result as string;

      var base64 = url.substr(url.indexOf(',') + 1);

      var seikahinImageModel: SeikahinImageModel = {
        seikahinImageId: 0,
        imageName: file.name,
        imageData: base64,
        width: 0,
        height: 0,
        hibiChushutsu: Chushutsu.NONE,
        sonshou: Chushutsu.NONE,
        hibiBunrui: Chushutsu.NONE,
        imageUrl:url
      };

      this.seikahinImages.push(seikahinImageModel);

      this.readImageNumber++;

      this.progressbarReadImage();

      
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
    
    this.seikahinImages.forEach(seikahinImage => {
      
      var tunnelImageModel: TunnelImageModel = {
        customerId: this.tunnelService.selectedTunnel.customerId,
        ankenId: this.tunnelService.selectedTunnel.ankenId,
        tunnelId: this.tunnelService.selectedTunnel.tunnelId,
        tunnelImageId: 0,
        seikahinImageId: 0,
        seikahinImage: seikahinImage
      };
      

      tunnelImageModels.push(tunnelImageModel);

    });
    
    return tunnelImageModels;
  }

  /**
   *  progressbarReadImage
   *
   *  トンネル画像読み込み中のプログレスバーを表示する
   *  
   *
   *  @return {void}
   */
  progressbarReadImage() {
    if (this.readImageNumber === this.selectedImageNumber) {

      this.isImageProgress = false;

      this.switchDisabledSaveButton(false);
    }
    else {

      this.isImageProgress = true;

      this.switchDisabledSaveButton(true);
    }
  }

  /**
   *  deleteSelectedTunnelImage
   *
   *  選択したトンネル画像を削除する
   *  
   *  @param  {SeikahinImageModel}    selectedImage
   *  
   *  @return {void}
   */
  deleteSelectedTunnelImage(selectedImage: SeikahinImageModel) {

    var targetIdx = this.seikahinImages.findIndex(seikahinImage => {
      return (seikahinImage.imageName === selectedImage.imageName);
    });


    if (targetIdx !== -1) {
      this.seikahinImages.splice(targetIdx, 1);
    }


    if (this.isChangeImageFromAddSidenav()) {
      this.switchDisabledSaveButton(false);
    }
    else {
      this.switchDisabledSaveButton(true);
    }

  }


  /**
   *  addSeikahinImagesFromDataSource
   *
   *  dataSourceに格納されている成果品画像情報をseikahinImagesに追加する
   *  
   *  
   *  @return {void}
   */
  addSeikahinImagesFromDataSource() {
    this.dataSource.data.forEach(data => {
      this.seikahinImages.push(data.seikahinImage);
    });
  }


  /**
   *  clearFileValue
   *
   *  ファイル選択ダイアログのファイルパスをクリアする
   *  
   *  
   *  @return {void}
   */
  clearFileValue(e) {
    e.value = '';
  }

  /**
   *  displayPreviewImages
   *
   *  選択したpreviewImageNameを基準とし、TunnelImage.SPAN数分のプレビュー画像を表示する
   *  
   *  
   *  @return {void}
   */
  displayPreviewImages() {

    if (!this.isSideNavPreview) return;
    
    this.basePreviewImageIndex = this.seikahinImages.findIndex(seikahinImage => {
      return (seikahinImage.imageName === this.previewImageName);
    });


    this.displayPreviewImagesFromIndex(this.basePreviewImageIndex);
    
  }


  /**
   *  displayNextPreviewImages
   *
   *  previewImageNameの次の画像を基準とし、TunnelImage.PREVIEW_SPAN数分のプレビュー画像を表示する
   *  
   *  
   *  @return {void}
   */
  displayNextPreviewImages() {
    if (!this.isSideNavPreview) return;

    this.basePreviewImageIndex += 1

    if (this.basePreviewImageIndex >= this.seikahinImages.length) return;

    this.initPreviewSideNav();

    this.previewImageName = this.seikahinImages[this.basePreviewImageIndex].imageName;

    this.displayPreviewImagesFromIndex(this.basePreviewImageIndex);
  }


  /**
   *  displayPrevtPreviewImages
   *
   *  previewImageNameの前の画像を基準とし、TunnelImage.PREVIEW_SPAN数分のプレビュー画像を表示する
   *  
   *  
   *  @return {void}
   */
  displayPrevPreviewImages() {

    if (!this.isSideNavPreview) return;

    this.basePreviewImageIndex -= 1;

    if (this.basePreviewImageIndex === -1) return;

    this.initPreviewSideNav();

    this.previewImageName = this.seikahinImages[this.basePreviewImageIndex].imageName;

    this.displayPreviewImagesFromIndex(this.basePreviewImageIndex);
  }

  /**
   *  displayPreviewImagesFromIndex
   *
   *  targetIdxを基準とし、TunnelImage.PREVIEW_SPAN数分のプレビュー画像を表示
   *  
   *  @param  {number}    targetIdx
   *  
   *  @return {void}
   */
  displayPreviewImagesFromIndex(targetIdx: number) {

    if (targetIdx === -1 || targetIdx >= this.seikahinImages.length) {
      this.isLoadPreviewImageProgress = false;
      return;
    }
    

    var i = 0;

    var j = 0;
    

    while (i < TunnelImage.PREVIEW_SPAN && targetIdx + i < this.seikahinImages.length) {

      const img = new Image();

      img.onload = () => {
        this.previewImages[j] = this.seikahinImages[targetIdx + j].imageUrl;
        j++;

        if (i === j) {

          this.isLoadPreviewImageProgress = false;

          if (targetIdx > 0) this.switchDisabledPrevImageButton(false);

          if (targetIdx < this.seikahinImages.length - 1) this.switchDisabledNextImageButton(false);

        }

      };

      img.src = this.seikahinImages[targetIdx + i].imageUrl;

      i++;
    }
  }

  /**
   *  initPreviewSideNav
   *
   *  プレビューサイドナビを初期設定する
   *  
   *  
   *  @return {void}
   */
  initPreviewSideNav() {
    this.previewImages = [];

    this.isLoadPreviewImageProgress = true;

    this.switchDisabledPrevImageButton(true);

    this.switchDisabledNextImageButton(true);

  }


   /**
   *  switchDisabledDeleteButton
   *
   *  削除ボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledDeleteButton(disabled: boolean) {

    this.isDeleteDisabled = disabled;

    this.deleteIconColor = disabled ? 'diabled' : 'primary';
    
  }

  /**
   *  switchDisabledSaveButton
   *
   *  保存ボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledSaveButton(disabled: boolean) {

    this.isSaveDisabled = disabled;

    this.saveIconColor = disabled ? 'diabled' : 'primary';
  }

  /**
   *  switchDisabledPrevImageButton
   *
   *  前の画像ボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledPrevImageButton(disabled: boolean) {

    this.isPrevImageDisabled = disabled;

    this.prevImageIconColor = disabled ? 'diabled' : 'primary';
  }

  /**
   *  switchDisabledNextImageButton
   *
   *  次の画像ボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledNextImageButton(disabled: boolean) {

    this.isNextImageDisabled = disabled;

    this.nextImageIconColor = disabled ? 'diabled' : 'primary';
  }

  /**
   *  switchDisabledUploadButton
   *
   *  アップロードボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledUploadButton(disabled: boolean) {

    this.isUploadDisabled = disabled;

    this.uploadIconColor = disabled ? 'diabled' : 'primary';
  }

  /**
   *  switchDisabledDownloadButton
   *
   *  ダウンロードボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledDownloadButton(disabled: boolean) {

    this.isDaichouDisabled = disabled;

    this.downloadIconColor = disabled ? 'diabled' : 'primary';
  }

  /**
   *  switchDisabledDaichouButton
   *
   *  台帳ボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledDaichouButton(disabled: boolean) {

    this.isDaichouDisabled = disabled;

    this.daichouIconColor = disabled ? 'diabled' : 'primary';
  }

  /**
   *  switchDisabledPrintButton
   *
   *  印刷ボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledPrintButton(disabled: boolean) {

    this.isPrintDisabled = disabled;

    this.printIconColor = disabled ? 'diabled' : 'primary';
  }

  /**
   *  switchDisabledSummaryButton
   *
   *  サマリーボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledSummaryButton(disabled: boolean) {

    this.isSummaryDisabled = disabled;

    this.summaryIconColor = disabled ? 'diabled' : 'primary';
  }


  /**
   *  isChangeImageFromAddSidenav
   *
   *  追加用サイドナビで画像を変更したか判定
   *  
   *  
   *  @return {boolean} 判定結果
   */
  isChangeImageFromAddSidenav(): boolean {

    if (this.dataSource.data.length !== this.seikahinImages.length) {
      return true;
    }

    this.dataSource.data.forEach(data => {
      var result = this.seikahinImages.find(image => {
        return (image.imageName === data.seikahinImage.imageName);
      });

      if (!result) {
        return true;
      }
    });

    return false;
  }
}
