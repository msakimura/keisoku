import { Component, OnInit, Input } from '@angular/core';
import { TunnelComponent } from '../tunnel/tunnel.component';
import { TunnelImage, Chushutsu } from 'src/app/shared/constant.module';
import { SeikahinImageModel } from 'src/app/services/seikahin-image.service';
import { ValidationModule } from 'src/app/shared/validation.module';
import { MatSidenav } from '@angular/material';
import { TunnelImageModel, TunnelImageService } from 'src/app/services/tunnel-image.service';
import { TunnelService } from 'src/app/services/tunnel.service';

@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.css']
})
export class AddimageComponent implements OnInit {

  @Input('childToSidenav') sideNav: MatSidenav;

  isSaveDisabled: boolean = true;

  saveIconColor = 'diabled';

  isImageProgress: boolean = false;

  addImageMessage = TunnelImage.ADD_IMAGE;

  readImageNumber: number;

  selectedImageNumber: number;

  seikahinImages: SeikahinImageModel[] = [];

  deletedTunnelImages: TunnelImageModel[] = [];

  dataSource: any;
  

  isSave: boolean = false;

  constructor(private tunnelService: TunnelService, private tunnelImageService: TunnelImageService) { }

  ngOnInit() {
  }
  
  /**
   *  destroy
   *
   *  画像追加画面の内容を破棄する
   *
   *  
   *
   *  @return {void}
   */
  destroy() {

    this.switchDisabledSaveButton(true);

    this.seikahinImages = [];

    this.deletedTunnelImages = [];

    this.isSave = false;
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

    this.isSave = true;

    this.closeSideNav();
    
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

    var innerId = 0;

    var tunnelImageModels: TunnelImageModel[] = [];

    this.seikahinImages.forEach(seikahinImage => {

      var target = this.dataSource.data.find(data => {
        return (data.seikahinImage.imageName === seikahinImage.imageName);
      });

      var tunnelImageModel: TunnelImageModel = {
        customerId: this.tunnelService.selectedTunnel.customerId,
        ankenId: this.tunnelService.selectedTunnel.ankenId,
        tunnelId: this.tunnelService.selectedTunnel.tunnelId,
        tunnelImageId: target ? target.tunnelImageId : 0,
        seikahinImageId: 0,
        seikahinImage: seikahinImage,
        innerId: innerId++
      };


      tunnelImageModels.push(tunnelImageModel);

    });

    return tunnelImageModels;
  }


  /**
   *  deleteTunnelImageInfoFromAddImage
   *
   *  削除したdeletedTunnelImagesについて、datasourceから削除する
   *  
   *  
   *  @return {void}
   */
  deleteTunnelImageInfoFromAddImage() {

    this.deletedTunnelImages.forEach(image => {
      this.tunnelImageService.deleteTunnelImage(image).subscribe(
        data => { },
        error => {
        });
    });

    var data = this.dataSource.data;

    this.deletedTunnelImages.forEach(image => {

      data = data.filter(function (element) { return (element.customerId != image.customerId || element.ankenId != image.ankenId || element.tunnelId != image.tunnelId || element.innerId != image.innerId); });
    });

    this.dataSource.data = data;

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
      var target = this.seikahinImages.splice(targetIdx, 1);

      var tunnelImage = this.dataSource.data.find(data => {
        return (data.seikahinImage.imageName === target[0].imageName);
      });

      if (tunnelImage) {

        this.deletedTunnelImages.push(tunnelImage);

      }
    }


    if (this.isChangeImageFromAddSidenav()) {
      this.switchDisabledSaveButton(false);
    }
    else {
      this.switchDisabledSaveButton(true);
    }

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
        imageUrl: url
      };

      this.seikahinImages.push(seikahinImageModel);

      this.readImageNumber++;

      this.progressbarReadImage();

    };

    reader.readAsDataURL(file);
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
  
}
