import { Component, OnInit } from '@angular/core';
import { TunnelComponent } from '../tunnel/tunnel.component';
import { TunnelImage } from 'src/app/shared/constant.module';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  previewImageName: string;

  isPrevImageDisabled: boolean = true;

  basePreviewImageIndex: number;

  isLoadPreviewImageProgress: boolean = false;

  previewImages: string[] = [];

  prevImageIconColor = 'disabled';

  nextImageIconColor = 'disabled';

  isNextImageDisabled: boolean = true;

  constructor(private parent: TunnelComponent) { }

  ngOnInit() {
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

    this.parent.closeSideNav();

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

    if (!this.parent.isSideNavPreview) return;

    this.basePreviewImageIndex -= 1;

    if (this.basePreviewImageIndex === -1) return;

    this.initPreviewSideNav();

    this.previewImageName = this.parent.seikahinImages[this.basePreviewImageIndex].imageName;

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
    if (!this.parent.isSideNavPreview) return;

    this.basePreviewImageIndex += 1

    if (this.basePreviewImageIndex >= this.parent.seikahinImages.length) return;

    this.initPreviewSideNav();

    this.previewImageName = this.parent.seikahinImages[this.basePreviewImageIndex].imageName;

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

    if (!this.parent.isSideNavPreview) return;

    this.basePreviewImageIndex = this.parent.seikahinImages.findIndex(seikahinImage => {
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

    if (targetIdx === -1 || targetIdx >= this.parent.seikahinImages.length) {
      this.isLoadPreviewImageProgress = false;
      return;
    }


    var i = 0;

    var j = 0;


    while (i < TunnelImage.PREVIEW_SPAN && targetIdx + i < this.parent.seikahinImages.length) {

      const img = new Image();

      img.onload = () => {
        this.previewImages[j] = this.parent.seikahinImages[targetIdx + j].imageUrl;
        j++;

        if (i === j) {

          this.isLoadPreviewImageProgress = false;

          if (targetIdx > 0) this.switchDisabledPrevImageButton(false);

          if (targetIdx < this.parent.seikahinImages.length - 1) this.switchDisabledNextImageButton(false);

        }

      };

      img.src = this.parent.seikahinImages[targetIdx + i].imageUrl;

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

}
