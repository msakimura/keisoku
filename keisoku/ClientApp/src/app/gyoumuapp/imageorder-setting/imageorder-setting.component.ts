import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InputMessage } from 'src/app/shared/constant.module';
import { TunnelImageModel } from 'src/app/services/tunnel-image.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSidenav, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ImageOrderSetModel, ImageorderSettingService } from 'src/app/services/imageorder-setting.service';
import { TunnelService } from 'src/app/services/tunnel.service';
import { InitialSettingService } from 'src/app/services/initial-setting.service';
import { SelectitemService } from 'src/app/services/selectitem.service';
import { ImageorderDialogComponent } from '../imageorder-dialog/imageorder-dialog.component';

@Component({
  selector: 'app-imageorder-setting',
  templateUrl: './imageorder-setting.component.html',
  styleUrls: ['./imageorder-setting.component.css']
})
export class ImageorderSettingComponent implements OnInit {

  isInput: boolean = false;


  hissuMessage: string = InputMessage.HISUU;

  hissuImageSelectMessage: string = InputMessage.HISSU_IMAGE_SELECT;

  hissuLengthMessage: string = InputMessage.HISSU_LENGTH;

  hissuKitenKiroteiMessage: string = InputMessage.HISSU_KITEN_KIROTEI;

  maxLengthMessage: string = InputMessage.MAXLENGTH_DECIMAL;


  tunnelImages: TunnelImageModel[];


  imageSelectFormControl = new FormControl('', [Validators.required]);
  
  lengthFormControl = new FormControl('', [Validators.required, Validators.max(8144.6384)]);

  kitenKiroteiFormControl = new FormControl('', [Validators.required, Validators.max(8144.6384)]);

  widthOrHeightSelected: string;

  length: number;

  kitenKirotei: number;

  imageAlignPosition: string;


  displayedColumns: string[] = ['name', 'span', 'align', 'edit'];

  dataSource = new MatTableDataSource<ImageOrderSetModel>();

  imageAlignPositions;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @Input('childToSidenav') sideNav: MatSidenav;


  constructor(private imageorderSettingService: ImageorderSettingService,
    private tunnelService: TunnelService,
    private initialSettingService: InitialSettingService,
    private selectitemService: SelectitemService,
    private matDialog: MatDialog) { }

  ngOnInit() {
    const sortingDataAccessor = (data: ImageOrderSetModel, sortHeaderId: string): string | number => {
      if (sortHeaderId === this.displayedColumns[0]) {
        return data.imageName;
      }
      else if (sortHeaderId === this.displayedColumns[1]) {
        return data.spanMoji;
      }
      else if (sortHeaderId === this.displayedColumns[2]) {
        return data.imageAlignPosition;
      }

      return '';
    };

    this.dataSource.data = [];

    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = sortingDataAccessor;

    this.dataSource.sort = this.sort;

  }

  /**
   *  initialize
   *
   *  画像並び設定を初期設定する
   *  
   *  
   *  @return {void}
   */
  initialize() {

    this.initWidthOrHeight();

    this.initLength();

    this.initKitenKirotei();

    this.initImageAlignPosition();

    this.initImageOrder();
  }


  /**
   *  initWidthOrHeight
   *
   *  横or縦を初期設定する
   *  
   *  
   *  @return {void}
   */
  initWidthOrHeight() {

    var model = this.initialSettingService.getWidthOrHeightInitialSetting();

    if (model.length === 1 && model[0].initialValue) {

      this.widthOrHeightSelected = model[0].initialValue;

    }
  }

  /**
   *  initLength
   *
   *  長さを初期設定する
   *  
   *  
   *  @return {void}
   */
  initLength() {

    var model = this.initialSettingService.getLengthMInitialSetting();

    if (model.length === 1) {

      this.lengthFormControl.setValue(model[0].initialValue);

    }
  }

  /**
   *  initKitenKirotei
   *
   *  起点の距離程を初期設定する
   *  
   *  
   *  @return {void}
   */
  initKitenKirotei() {

    var model = this.initialSettingService.getKitenKiroteiInitialSetting();

    if (model.length === 1) {
      
      this.kitenKiroteiFormControl.setValue(model[0].initialValue);
    }
  }

  /**
   *  initImageAlignPosition
   *
   *  画像揃え位置を初期設定する
   *  
   *  
   *  @return {void}
   */
  initImageAlignPosition() {

    var model = this.initialSettingService.getImageAlignPositionInitialSetting();

    if (model.length === 1 && model[0].initialValue) {

      this.imageAlignPosition = model[0].initialValue;

    }
  }

  /**
   *  initImageOrder
   *
   *  画像並びを初期設定する
   *  
   *  
   *  @return {void}
   */
  initImageOrder() {

    var imageOrderSetModels: ImageOrderSetModel[] = new Array();

    this.tunnelImages.forEach(tunnelImage => {

      imageOrderSetModels.push(this.convertImageOrderSetModel(tunnelImage));

    });

    this.dataSource.data = imageOrderSetModels;

  }


  /**
   *  bindImageorderSetting
   *
   *  customerId、ankenId、tunnelIdに紐付く全ての画像並び設定情報をバインドする
   *  
   *  
   *  @return {void}
   */
  bindHibiwareshoriSetting() {
    const selectedTunnel = this.tunnelService.selectedTunnel;

    this.imageorderSettingService.getImageOrderSets(selectedTunnel.customerId, selectedTunnel.ankenId, selectedTunnel.tunnelId)
      .subscribe((response: any) => {

        this.imageSelectFormControl.setValue(response.seikahinImageId);
        
        this.lengthFormControl.setValue(response.length);

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

  saveImageOrderSet() { }


  /**
   *  showEditDialog
   *
   *  選択したレコードに対する画像並びダイアログを表示する
   *  
   *
   *  @return {void}
   */
  showEditDialog(row) {

    const dialogRef = this.matDialog.open(ImageorderDialogComponent, {
      'disableClose': false,
      data: row
    });

  }


  /**
   *  convertImageOrderSetModel
   *
   *  TunnelImageModelをImageOrderSetModelに変換する
   *  
   *  @param  {TunnelImageModel}    tunnelImageModel
   *
   *  @return {ImageOrderSetModel}
   */
  convertImageOrderSetModel(tunnelImageModel: TunnelImageModel): ImageOrderSetModel {

    var imageName = tunnelImageModel.seikahinImage.imageName;
    var spanMoji = this.getSpanMoji(imageName);


    var imageAlignPositionName = '';
    var verticalAlignSelectItem = this.selectitemService.getVerticalAlignSelectItem(Number(this.imageAlignPosition));
    if (verticalAlignSelectItem.length === 1) {
      imageAlignPositionName = verticalAlignSelectItem[0].selectItemName;
    }

    var imageOrderSetModel: ImageOrderSetModel = {
      customerId: tunnelImageModel.customerId,
      ankenId: tunnelImageModel.ankenId,
      tunnelId: tunnelImageModel.tunnelId,
      imageOrderSetId: 0,
      seikahinImageId: tunnelImageModel.seikahinImageId,
      widthOrHeight: 0,
      length: 0,
      kitenKirotei: 0,
      spanMoji: spanMoji,
      imageAlignPosition: this.imageAlignPosition,
      imageName: imageName,
      imageAlignPositionName: imageAlignPositionName
    };


    return imageOrderSetModel;
  }


  /**
   *  getSpanMoji
   *
   *  imageNameを元にスパン文字を取得する
   *  
   *  @param  {string}    imageName
   *
   *  @return {string} スパン文字
   */
  getSpanMoji(imageName:string) :string{

    var replaceImageName = imageName.replace('.jpg', '');
    

    return 'S' + replaceImageName.substring(replaceImageName.length - 4);

  }
}
