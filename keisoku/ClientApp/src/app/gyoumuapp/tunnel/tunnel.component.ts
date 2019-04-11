import { Component, OnInit, ViewChild, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
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
import { AiriyoujoukyouComponent } from '../airiyoujoukyou/airiyoujoukyou.component';
import { AddimageComponent } from '../addimage/addimage.component';
import { PreviewComponent } from '../preview/preview.component';


@Component({
  selector: 'app-tunnel',
  templateUrl: './tunnel.component.html',
  styleUrls: ['./tunnel.component.css']
})
export class TunnelComponent implements OnInit {

  isSideNavImage: boolean = false;

  isSideNavPreview: boolean = false;

  isSideNavAiRiyoujoukyou: boolean = false;
  

  isDeleteDisabled: boolean = true;

  isUploadDisabled: boolean = true;

  isDownloadDisabled: boolean = true;

  isDaichouDisabled: boolean = true;

  isPrintDisabled: boolean = true;

  isSummaryDisabled: boolean = true;


  deleteIconColor = 'diabled';

  uploadIconColor = 'disabled';

  downloadIconColor = 'disabled';

  daichouIconColor = 'disabled';

  printIconColor = 'disabled';

  summaryIconColor = 'disabled';


  ankenName: string;

  tunnelName: string;
  
  previewImageName: string;

  seikahinImages: SeikahinImageModel[] = [];
  
  message: string;
  

  displayedColumns: string[] = ['select', 'name', 'width', 'height', 'hibiChushutsu', 'sonshou', 'hibiBunrui'];

  dataSource = new MatTableDataSource<TunnelImageModel>();

  selection = new SelectionModel<TunnelImageModel>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(AiriyoujoukyouComponent) aiRiyoujoukyouComponent: AiriyoujoukyouComponent;

  @ViewChild(AddimageComponent) addImageComponent: AddimageComponent;

  @ViewChild(PreviewComponent) previewComponent: PreviewComponent;


  constructor(private router: Router,
    private http: HttpClient,
    private ankenService: AnkenService,
    private tunnelService: TunnelService,
    private tunnelImageService: TunnelImageService,
    private seikahinImageService: SeikahinImageService) { }


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

      data = data.filter(function (element) { return (element.customerId != image.customerId || element.ankenId != image.ankenId || element.tunnelId != image.tunnelId || element.innerId != image.innerId); });
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

        // 成果品画像アップロード後、取得した成果品画像IDをトンネル画像情報に設定し
        // トンネル画像情報をDBに追加する
        this.seikahinImageService.insertSeikahinImage(image.seikahinImage)
          .subscribe((response: any) => {

            var seikahinImage = response;
            this.message = image.seikahinImage.imageName;

            var target = this.dataSource.data.find(data => {
              return (data.seikahinImage && data.seikahinImage.imageName === response.imageName);
            });

            target.seikahinImageId = response.seikahinImageId;
            target.seikahinImage = null;

            this.tunnelImageService.insertTunnelImage(target)
              .subscribe((response: any) => {

                this.message = 'アップロード完了';

                target.tunnelImageId = response.tunnelImageId;
                target.seikahinImage = seikahinImage;
              },
              error => {

                this.message = 'アップロード失敗';
              });

          },
          error => {

          });

      }
      
    });


    this.selection.clear();

    this.changeDisabled();
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

    this.isSideNavAiRiyoujoukyou = false;

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

    this.isSideNavAiRiyoujoukyou = false;

    this.previewImageName = row.seikahinImage.imageName;

    this.preInitPreviewComponent();

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
   *  initSidenav
   *
   *  サイドナビに表示するコンポーネントを初期化する
   *  
   *  
   *  @return {void}
   */
  initSidenav() {

    if (this.isSideNavImage) {

      this.initAddimageComponent();

    }
    else if (this.isSideNavPreview) {

      this.initPreviewComponent();

    }
    else if (this.isSideNavAiRiyoujoukyou) {

      this.initAiriyoujoukyouComponent();

    }

  }


  /**
   *  initAddimageComponent
   *
   *  サイドナビに表示するAddimageComponentを初期化する
   *  
   *  
   *  @return {void}
   */
  initAddimageComponent() {

    if (this.addImageComponent) {

      this.addImageComponent.sideNav = this.sideNav;

      this.addImageComponent.seikahinImages = this.seikahinImages;

      this.addImageComponent.dataSource = this.dataSource;

    }
  }


  /**
   *  preInitPreviewComponent
   *
   *  サイドナビオープン前にPreviewComponentを初期化する
   *  
   *  
   *  @return {void}
   */
  preInitPreviewComponent() {

    if (this.previewComponent) {

      this.previewComponent.initPreviewContent();

    }

  }

  /**
   *  initPreviewComponent
   *
   *  サイドナビに表示するPreviewComponentを初期化する
   *  
   *  
   *  @return {void}
   */
  initPreviewComponent() {

    if (this.previewComponent) {

      this.previewComponent.sideNav = this.sideNav;

      this.previewComponent.seikahinImages = this.seikahinImages;

      this.previewComponent.isLoadPreviewImageProgress = true;

      this.previewComponent.displayPreviewImages();
      
    }
  }


  /**
   *  initAiriyoujoukyouComponent
   *
   *  サイドナビに表示するAiriyoujoukyouComponentを初期化する
   *  
   *  
   *  @return {void}
   */
  initAiriyoujoukyouComponent() {

    if (this.aiRiyoujoukyouComponent) {

      this.aiRiyoujoukyouComponent.initialize();
      this.aiRiyoujoukyouComponent.sideNav = this.sideNav;

    }
  }


  /**
   *  destroySideNav
   *
   *  サイドナビに表示したコンポーネントの内容を破棄する
   *  
   *  
   *  @return {void}
   */
  destroySideNav() {

    if (this.isSideNavImage) {

      this.destroyAddimageComponent();

    }
    else if (this.isSideNavPreview) {

      this.destroyPreviewComponent();

    }
    else if (this.isSideNavAiRiyoujoukyou) {

      this.destroyAiriyoujoukyouComponent();

    }
  }


  /**
   *  destroyAddimageComponent
   *
   *  サイドナビに表示したAddimageComponentを破棄する
   *  
   *  
   *  @return {void}
   */
  destroyAddimageComponent() {

    if (this.addImageComponent.isSave) {
      this.selection.clear();

      this.changeDisabled();
    }
    
    this.addImageComponent.destroy();
    
  }


  /**
   *  destroyPreviewComponent
   *
   *  サイドナビに表示したPreviewComponentを破棄する
   *  
   *  
   *  @return {void}
   */
  destroyPreviewComponent() {

    this.previewComponent.destroy();

  }


  /**
   *  destroyAiriyoujoukyouComponent
   *
   *  サイドナビに表示したAiriyoujoukyouComponentを破棄する
   *  
   *  
   *  @return {void}
   */
  destroyAiriyoujoukyouComponent() {

    this.aiRiyoujoukyouComponent.destroy();

  }
}
