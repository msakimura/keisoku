import { Component, OnInit, Input } from '@angular/core';
import { TunnelComponent } from '../tunnel/tunnel.component';
import { TunnelImage } from 'src/app/shared/constant.module';
import { MatSidenav } from '@angular/material';
import { SeikahinImageModel } from 'src/app/services/seikahin-image.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input('childToPreview') previewImageName: string;

  isPrevImageDisabled: boolean = true;

  basePreviewImageIndex: number;

  isLoadPreviewImageProgress: boolean = true;

  previewImages: string[] = [];

  prevImageIconColor = 'disabled';

  nextImageIconColor = 'disabled';

  isNextImageDisabled: boolean = true;

  sideNav: MatSidenav;

  seikahinImages: SeikahinImageModel[] = [];

  loadPreviewImageMessage = TunnelImage.LOAD_PREVIEWIMAGE;


  constructor() { }

  ngOnInit() {
  }


  /**
   *  destroy
   *
   *  プレビュー画面の内容を破棄する
   *
   *  
   *
   *  @return {void}
   */
  destroy() {

    this.initPreviewContent();

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
   *  displayPrevtPreviewImages
   *
   *  previewImageNameの前の画像を基準とし、TunnelImage.PREVIEW_SPAN数分のプレビュー画像を表示する
   *  
   *  
   *  @return {void}
   */
  displayPrevPreviewImages() {

    this.basePreviewImageIndex -= 1;

    if (this.basePreviewImageIndex === -1) return;

    this.initPreviewContent();

    this.previewImageName = this.seikahinImages[this.basePreviewImageIndex].imageName;

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

    this.basePreviewImageIndex += 1

    if (this.basePreviewImageIndex >= this.seikahinImages.length) return;

    this.initPreviewContent();

    this.previewImageName = this.seikahinImages[this.basePreviewImageIndex].imageName;

    this.displayPreviewImagesFromIndex(this.basePreviewImageIndex);
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

    this.basePreviewImageIndex = this.seikahinImages.findIndex(seikahinImage => {
      return (seikahinImage.imageName === this.previewImageName);
    });
    
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
   *  initPreviewContent
   *
   *  プレビュー画面の内容を初期化する
   *  
   *  
   *  @return {void}
   */
  initPreviewContent() {

    this.isLoadPreviewImageProgress = true;

    this.previewImages = [];

    this.switchDisabledPrevImageButton(true);

    this.switchDisabledNextImageButton(true);
  }
}
