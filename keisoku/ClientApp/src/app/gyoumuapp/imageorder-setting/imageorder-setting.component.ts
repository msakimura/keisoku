import { Component, OnInit, Input } from '@angular/core';
import { InputMessage } from 'src/app/shared/constant.module';
import { TunnelImageModel } from 'src/app/services/tunnel-image.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSidenav, MatTableDataSource } from '@angular/material';
import { ImageOrderSetModel, ImageorderSettingService } from 'src/app/services/imageorder-setting.service';
import { TunnelService } from 'src/app/services/tunnel.service';
import { InitialSettingService } from 'src/app/services/initial-setting.service';

@Component({
  selector: 'app-imageorder-setting',
  templateUrl: './imageorder-setting.component.html',
  styleUrls: ['./imageorder-setting.component.css']
})
export class ImageorderSettingComponent implements OnInit {

  isInput: boolean = false;

  widthOrHeightSelected: string;


  hissuMessage: string = InputMessage.HISUU;

  hissuImageSelectMessage: string = InputMessage.HISSU_IMAGE_SELECT;

  hissuLengthMessage: string = InputMessage.HISSU_LENGTH;

  maxLengthMessage: string = InputMessage.MAXLENGTH_DECIMAL;


  tunnelImages: TunnelImageModel[];


  imageSelectFormControl = new FormControl('', [Validators.required]);

  widthOrHeightFormControl = new FormControl('', [Validators.required]);

  lengthFormControl = new FormControl('', [Validators.required, Validators.max(8144.6384)]);

  kitenKiroteiFormControl = new FormControl('', [Validators.required, Validators.max(8144.6384)]);


  displayedColumns: string[] = ['name', 'span', 'align'];

  dataSource = new MatTableDataSource<ImageOrderSetModel>();

  imageAlignPositions;


  @Input('childToSidenav') sideNav: MatSidenav;


  constructor(private imageorderSettingService: ImageorderSettingService,
    private tunnelService: TunnelService,
    private initialSettingService: InitialSettingService) { }

  ngOnInit() {

    this.initializeWidthOrHeight();

  }

  /**
   *  initialWidthOrHeight
   *
   *  横or縦を初期設定する
   *  
   *  
   *  @return {void}
   */
  initializeWidthOrHeight() {

    var model = this.initialSettingService.getWidthOrHeightInitialSetting();

    if (model.length == 1) {

      this.widthOrHeightSelected = model[0].initialValue;

    }

  }


  /**
   *  bindImageAlignPosition
   *
   *  画像揃え位置情報をバインドする
   *  
   *  
   *  @return {void}
   */
  bindImageAlignPosition() {
    
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

        this.widthOrHeightFormControl.setValue(response.widthOrHeight);

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

  saveImageOrderSet() {}
}
