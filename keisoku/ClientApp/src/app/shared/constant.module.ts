import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class InputMessage {
  public static readonly HISUU = '必須項目を入力してください';
  public static readonly USED_LOGINID = '入力したログインIDは既に使われています';
  public static readonly HISSU_CUSTOMER = '顧客名は必須です';
  public static readonly HISSU_USERNAME = 'ユーザ名は必須です';
  public static readonly HISSU_LOGINID = 'ログインIDは必須です';
  public static readonly HISSU_PASSWORD = 'パスワードは必須です';
  public static readonly HISSU_ANKEN = '案件名は必須です';
  public static readonly HISSU_TUNNEL = 'トンネル名は必須です';
}

export class PasswordMessage {
  public static readonly MINLENGTH = '6文字以上入力してください';
  public static readonly ALPHABET = '英字を1文字以上含めてください';
  public static readonly LOWCASE = '小文字を1文字以上含めてください';
  public static readonly UPPERCASE = '大文字を1文字以上含めてください';
  public static readonly DIGIT = '数字を1文字以上含めてください';
  public static readonly SYMBOL = '記号を1文字以上含めてください';
}

export class Kengen {
  public static readonly KANRI = '管理';
  public static readonly ANKEN = '案件作成';
  public static readonly TUNNEL = 'トンネル作成';
  public static readonly UPLOAD = 'アップロード';
  public static readonly DOWNLOAD = 'ダウンロード';
}

export class Chushutsu {
  public static readonly NONE = '未';
}

export class TunnelImage {
  public static readonly PREVIEW_SPAN = 5;
  public static readonly ADD_IMAGE = '画像を追加しています';
  public static readonly LOAD_PREVIEWIMAGE = 'プレビュー画像を読み込んでいます';

}

export class ProgressMessage {
  public static readonly UPLOAD_START = 'アップロードしています';
  public static readonly UPLOAD_SUCCESS = 'アップロードが完了しました';
  public static readonly UPLOAD_ERROR = 'アップロードに失敗しました';

}
