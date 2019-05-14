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
import { ValidationModule } from 'src/app/shared/validation.module';

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

  maxLengthMessage: string = InputMessage.MAX_DECIMAL;

  minLengthMessage: string = InputMessage.MIN_OVER_ZERO;

  maxKitenKiroteiMessage: string = InputMessage.MAX_DECIMAL;

  minKitenKiroteiMessage: string = InputMessage.MIN_ZERO;


  tunnelImages: TunnelImageModel[];


  imageSelectFormControl = new FormControl('', [Validators.required]);
  
  lengthFormControl = new FormControl('', [Validators.required, Validators.max(8144.6384), ValidationModule.isOverZero]);

  kitenKiroteiFormControl = new FormControl('', [Validators.required, Validators.max(8144.6384), Validators.min(0)]);

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

    this.bindImageorderSetting();
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
    this.isInput = false;

    this.imageSelectFormControl.reset();

    this.lengthFormControl.reset();

    this.kitenKiroteiFormControl.reset();

    this.widthOrHeightSelected = '';

    this.dataSource.data = [];
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
  bindImageorderSetting() {
    const selectedTunnel = this.tunnelService.selectedTunnel;

    this.imageorderSettingService.getImageOrderSets(selectedTunnel.customerId, selectedTunnel.ankenId, selectedTunnel.tunnelId)
      .subscribe((response: any) => {

        var imageOrderSetModels = this.imageorderSettingService.convertImageOrderSetModels(response);

        this.dataSource.data = imageOrderSetModels;

        // 横or縦が設定されているデータをバインド
        var target = imageOrderSetModels.filter(function (element) {
          return element.widthOrHeight !== 0;
        });

        if (target.length === 1) {

          this.imageSelectFormControl.setValue(target[0].seikahinImageId);

          this.lengthFormControl.reset(target[0].length);

          this.kitenKiroteiFormControl.reset(target[0].kitenKirotei);

          this.widthOrHeightSelected = target[0].widthOrHeight.toString();
          
        }
        
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
   *  saveImageOrderSet
   *
   *  入力した画像並び設定情報をDBに保存する
   *  
   *
   *  @return {void}
   */
  saveImageOrderSet() {

    // 必須入力チェック
    if (this.imageSelectFormControl.invalid || this.lengthFormControl.invalid || this.kitenKiroteiFormControl.invalid) {
      this.isInput = true;

      return;
    }

    // ひび割れ処理設定情報をDBに追加
    var imageOrderSetInfos = this.getInputImageOrderSetModels();

    this.imageorderSettingService.insertImageOrderSets(imageOrderSetInfos)
      .subscribe((response: any) => {

        this.sideNav.close();

      },
      error => {
      });

  }


  /**
   *  showEditDialog
   *
   *  選択したレコードに対する画像並びダイアログを表示する
   *
   *  @param  {any}    row
   *
   *  @return {void}
   */
  showEditDialog(row) {

    this.matDialog.open(ImageorderDialogComponent, {
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
    

    return 'S' + replaceImageName.substring(replaceImageName.length - 3);

  }


  /**
   *  getInputImageOrderSetModels
   *
   *  入力項目の画像並び設定情報を取得する
   *  
   *
   *  @return {ImageOrderSetModel} 画像並び設定情報配列
   */
  getInputImageOrderSetModels(): ImageOrderSetModel[] {

    const selectedTunnel = this.tunnelService.selectedTunnel;

    var imageOrderSetInfos: ImageOrderSetModel[] = new Array();

    this.dataSource.data.forEach(data => {

      var imageOrderSetInfo: ImageOrderSetModel = {
        customerId: selectedTunnel.customerId,
        ankenId: selectedTunnel.ankenId,
        tunnelId: selectedTunnel.tunnelId,
        imageOrderSetId: 0,
        seikahinImageId: data.seikahinImageId,
        widthOrHeight: 0,
        length: 0,
        kitenKirotei: this.kitenKiroteiFormControl.value,
        spanMoji: data.spanMoji,
        imageAlignPosition: data.imageAlignPosition,
        imageName: data.imageName,
        imageAlignPositionName: data.imageAlignPositionName
      };

      imageOrderSetInfos.push(imageOrderSetInfo);

    });

    var imageSelect = this.imageSelectFormControl.value;

    // 画像選択したレコードは、横or縦、長さを設定する
    var target = imageOrderSetInfos.filter(function (element) {
      return element.seikahinImageId === imageSelect;
    });

    if (target.length === 1) {
      target[0].widthOrHeight = Number(this.widthOrHeightSelected);

      target[0].length = this.lengthFormControl.value;
    }
    
    return imageOrderSetInfos;
  }


  /**
   *  onChangeWidthOrHeight
   *
   *  横or縦を変更した場合、widthOrHeightSelectedをvalueで更新する
   *  
   *
   *  @return {void}
   */
  onChangeWidthOrHeight(value) {

    this.widthOrHeightSelected = value;
  }
}
