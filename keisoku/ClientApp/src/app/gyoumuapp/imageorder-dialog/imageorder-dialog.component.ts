import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputMessage } from 'src/app/shared/constant.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageOrderSetModel } from 'src/app/services/imageorder-setting.service';
import { SelectitemService } from 'src/app/services/selectitem.service';

@Component({
  selector: 'app-imageorder-dialog',
  templateUrl: './imageorder-dialog.component.html',
  styleUrls: ['./imageorder-dialog.component.css']
})
export class ImageorderDialogComponent implements OnInit {
  isInput: boolean = false;

  spanMojiFormControl = new FormControl('', [Validators.required]);

  hissuMessage: string = InputMessage.HISUU;

  hissuSpanMojiMessage: string = InputMessage.HISSU_SPAN_MOJI;


  imageAlignSelected: string;
  


  constructor(public matDialogRef: MatDialogRef<ImageorderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageOrderSetModel,
    private selectitemService: SelectitemService) { }

  ngOnInit() {

    this.spanMojiFormControl.setValue(this.data.spanMoji);

    this.imageAlignSelected = this.data.imageAlignPosition.toString();
  }

  /**
   *  onChange
   *
   *  画像並び情報を変更する
   *  
   *
   *  @return {void}
   */
  onChange() {

    // 必須入力チェック
    if (this.spanMojiFormControl.invalid) {
      this.isInput = true;
      return;
    }

    this.data.spanMoji = this.spanMojiFormControl.value;

    this.data.imageAlignPosition = this.imageAlignSelected;

    var verticalAlignSelectItem = this.selectitemService.getVerticalAlignSelectItem(Number(this.imageAlignSelected));
    if (verticalAlignSelectItem.length === 1) {
      this.data.imageAlignPositionName = verticalAlignSelectItem[0].selectItemName;
    }

    this.matDialogRef.close();
  }


  /**
   *  onChangeImageAlignPos
   *
   *  画像揃え位置を変更した場合、imageAlignSelectedをvalueで更新する
   *  
   *
   *  @return {void}
   */
  onChangeImageAlignPos(value) {

    this.imageAlignSelected = value;
  }
}
