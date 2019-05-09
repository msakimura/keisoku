import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSidenav, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { TunnelService, OsiraseModel } from 'src/app/services/tunnel.service';
import { TunnelImageModel, TunnelImageService } from 'src/app/services/tunnel-image.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AnkenService } from 'src/app/services/anken.service';
import { Router } from '@angular/router';
import { SeikahinImageModel, SeikahinImageService } from 'src/app/services/seikahin-image.service';
import { AiriyoujoukyouComponent } from '../airiyoujoukyou/airiyoujoukyou.component';
import { AddimageComponent } from '../addimage/addimage.component';
import { PreviewComponent } from '../preview/preview.component';
import { UserService } from 'src/app/services/user.service';
import { ProgressMessage, SessionMessage } from 'src/app/shared/constant.module';
import { OsiraseComponent } from '../osirase/osirase.component';
import { SpinnerdialogComponent } from 'src/app/components/spinnerdialog/spinnerdialog.component';
import { SessionService } from 'src/app/services/session.service';
import { ImageorderSettingComponent } from '../imageorder-setting/imageorder-setting.component';


@Component({
  selector: 'app-tunnel',
  templateUrl: './tunnel.component.html',
  styleUrls: ['./tunnel.component.css']
})
export class TunnelComponent implements OnInit {

  isSideNavImage: boolean = false;

  isSideNavPreview: boolean = false;

  isSideNavAiRiyoujoukyou: boolean = false;

  isSideNavOsirase: boolean = false;

  isSideNavHibiwareShoriSet: boolean = false;

  isSideNavImageOrderSet: boolean = false;


  isDeleteDisabled: boolean = true;

  isUploadDisabled: boolean = true;

  isDownloadDisabled: boolean = true;

  isDaichouDisabled: boolean = true;

  isPrintDisabled: boolean = true;

  isSummaryDisabled: boolean = true;

  isOsirase: boolean = false;


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

  osirases: OsiraseModel[] = [];
  

  displayedColumns: string[] = ['select', 'name', 'width', 'height', 'hibiChushutsu', 'sonshou', 'hibiBunrui'];

  dataSource = new MatTableDataSource<TunnelImageModel>();

  selection = new SelectionModel<TunnelImageModel>(true, []);

  dialogRef: MatDialogRef<SpinnerdialogComponent>;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(AiriyoujoukyouComponent) aiRiyoujoukyouComponent: AiriyoujoukyouComponent;

  @ViewChild(AddimageComponent) addImageComponent: AddimageComponent;

  @ViewChild(PreviewComponent) previewComponent: PreviewComponent;

  @ViewChild(OsiraseComponent) osiraseComponent: OsiraseComponent;

  @ViewChild(ImageorderSettingComponent) imageorderSettingComponent: ImageorderSettingComponent;


  constructor(private router: Router,
    private http: HttpClient,
    private ankenService: AnkenService,
    private tunnelService: TunnelService,
    private tunnelImageService: TunnelImageService,
    private seikahinImageService: SeikahinImageService,
    private userService: UserService,
    private dialog: MatDialog,
    private sessionService: SessionService) { }


  ngOnInit() {

    if (this.sessionService.signout(SessionMessage.TIMEOUT)) {
      return;
    }

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

      if (this.isUploadKengen()) { this.switchDisabledUploadButton(false); }
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
    
    this.addOsiraseInfo();

    
    this.selection.selected.forEach(image => {

      if (image.tunnelImageId === 0) {

        // 成果品画像アップロード後、取得した成果品画像IDをトンネル画像情報に設定し
        // トンネル画像情報をDBに追加する
        this.seikahinImageService.insertSeikahinImage(image.seikahinImage)
          .subscribe((response: any) => {

            var seikahinImage = response;

            var target = this.dataSource.data.find(data => {
              return (data.seikahinImage && data.seikahinImage.imageName === response.imageName);
            });

            target.seikahinImageId = response.seikahinImageId;
            target.seikahinImage = null;

            this.tunnelImageService.insertTunnelImage(target)
              .subscribe((response: any) => {

                target.tunnelImageId = response.tunnelImageId;
                target.seikahinImage = seikahinImage;


                this.successOshiraseInfo(image.seikahinImage.imageName, ProgressMessage.UPLOAD_SUCCESS);

              },
              error => {

                this.errorOshiraseInfo(image.seikahinImage.imageName, ProgressMessage.UPLOAD_ERROR);
              });

          },
          error => {

            this.errorOshiraseInfo(image.seikahinImage.imageName, ProgressMessage.UPLOAD_ERROR);

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

    this.clearSidenavFlag();

    this.isSideNavImage = true;


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
    this.clearSidenavFlag();

    this.isSideNavPreview = true;
    

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

    this.clearSidenavFlag();

    this.isSideNavAiRiyoujoukyou = true;
    
    this.sideNav.open();
  }


  /**
   *  displaySideNavOshirase
   *
   *  お知らせのサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displaySideNavOshirase() {

    this.clearSidenavFlag();

    this.isSideNavOsirase = true;

    this.sideNav.open();
  }



  /**
   *  displaySideNavHibiwareShoriSet
   *
   *  ひび割れ処理設定のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displaySideNavHibiwareShoriSet() {

    this.clearSidenavFlag();

    this.isSideNavHibiwareShoriSet = true;

    this.sideNav.open();
  }


  /**
   *  displaySideNavImageOrderSet
   *
   *  画像並び設定のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displaySideNavImageOrderSet() {

    this.clearSidenavFlag();

    this.isSideNavImageOrderSet = true;

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
    else if (this.isSideNavOsirase) {

      this.initOsiraseComponent();

    }
    else if (this.isSideNavImageOrderSet) {

      this.initImageOrderSettingComponent();

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
    }
    
  }


  /**
   *  initOsiraseComponent
   *
   *  サイドナビに表示するOsiraseComponentを初期化する
   *  
   *  
   *  @return {void}
   */
  initOsiraseComponent() {

    if (this.osiraseComponent) {
      this.osiraseComponent.dataSource.data = this.osirases;
    }
    
  }


  /**
   *  initImageOrderSettingComponent
   *
   *  サイドナビに表示するImageorderSettingComponentを初期化する
   *  
   *  
   *  @return {void}
   */
  initImageOrderSettingComponent() {

    if (this.imageorderSettingComponent) {
      this.imageorderSettingComponent.tunnelImages = this.dataSource.data;
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

    if (this.aiRiyoujoukyouComponent.isKakutei) {
      this.uploadTunnelImageInfo();
    }
    

    this.aiRiyoujoukyouComponent.destroy();

    this.dialogRef.close();
  }


  /**
  *  isUploadKengen
  *
  *  アップロードの権限があるか判定する
  *  
  *  
  *  @return {boolean} 判定結果
  */
  isUploadKengen(): boolean {

    if (!this.userService.loginUserModel) return false;

    if (this.userService.loginUserModel.upload === '✕') return false;

    return true;

  }


  /**
  *  isDownloadKengen
  *
  *  ダウンロードの権限があるか判定する
  *  
  *  
  *  @return {boolean} 判定結果
  */
  isDownloadKengen(): boolean {

    if (!this.userService.loginUserModel) return false;

    if (this.userService.loginUserModel.download === '✕') return false;

    return true;

  }


  /**
  *  addOsiraseInfo
  *
  *  お知らせに表示する情報を追加する
  *  
  *  
  *  @return {void}
  */
  addOsiraseInfo() {

    this.selection.selected.forEach(data => {

      var value: OsiraseModel = { fileName: data.seikahinImage.imageName, message: ProgressMessage.UPLOAD_START, success: false, error:false};

      this.osirases.push(value);

    });

    this.isOsirase = true;
  }


  /**
  *  successOshiraseInfo
  *
  *  fileNameに一致するお知らせ情報の状態を成功にする
  *  
  *  @param  {string}    fileName
  *  @param  {string}    message
  *
  *  @return {void}
  */
  successOshiraseInfo(fileName: string, message: string) {

    var target = this.osirases.find(data => {
      return (data.fileName === fileName);
    });

    if (target) {
      target.message = message;
      target.success = true;

    }
  }

  /**
  *  errorOshiraseInfo
  *
  *  fileNameに一致するお知らせ情報の進捗を失敗にする
  *
  *  @param  {string}    fileName
  *  @param  {string}    message
  *
  *  @return {void}
  */
  errorOshiraseInfo(fileName: string, message: string) {

    var target = this.osirases.find(data => {
      return (data.fileName === fileName);
    });

    if (target) {
      target.message = message;
      target.error = true;
    }
  }


  /**
  *  closeSideNavAction
  *
  *  サイドナビを閉じるときにアクションする
  *
  *
  *  @return {void}
  */
  closeSideNavAction() {

    if (this.isSideNavAiRiyoujoukyou) {

      this.dialogRef = this.dialog.open(SpinnerdialogComponent, {
        panelClass: 'myapp-spinner-dialog',
        disableClose: true
      });
      
    }
  }


  /**
  *  clearSidenavFlag
  *
  *  サイドナビに表示する画面のフラグをクリアする
  *
  *
  *  @return {void}
  */
  clearSidenavFlag() {
    this.isSideNavImage = false;

    this.isSideNavPreview = false;

    this.isSideNavAiRiyoujoukyou = false;

    this.isSideNavOsirase = false;

    this.isSideNavHibiwareShoriSet = false;

    this.isSideNavImageOrderSet = false;
  }
}
