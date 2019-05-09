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
  public static readonly HISSU_CURRENT_PASS = '現在のパスワードは必須です';
  public static readonly HISSU_NEW_PASS = '新パスワードは必須です';
  public static readonly HISSU_USERID = 'ユーザIDは必須です';
  public static readonly HISSU_TANSHUKU_REMOVE = '短縮削除は必須です';
  public static readonly HISSU_KAIKOUHABA_MOJI_SIZE = '開口幅文字サイズは必須です';
  public static readonly HISSU_IMAGE_SELECT = '画像選択は必須です';
  public static readonly HISSU_LENGTH = '長さ(m)は必須です';
  public static readonly NUMERIC = '数値を入力してください';
  public static readonly MAXLENGTH_DECIMAL = '7.9228 x 10^28以下の数値を入力してください';
  public static readonly MAXLENGTH_DOUBLE = '1.7 x 10^308以下の数値を入力してください';

}

export class PasswordMessage {
  public static readonly MINLENGTH = '6文字以上入力してください';
  public static readonly ALPHABET = '英字を1文字以上含めてください';
  public static readonly LOWCASE = '小文字を1文字以上含めてください';
  public static readonly UPPERCASE = '大文字を1文字以上含めてください';
  public static readonly DIGIT = '数字を1文字以上含めてください';
  public static readonly SYMBOL = '記号を1文字以上含めてください';
  public static readonly CONFIRM = '新パスワードとパスワードの確認が違います';
  public static readonly CURRENT = '現在のパスワードが違います';

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

export class Responsive {
  public static readonly TITLE_TEXT_SIZE = 18;

}

export class PasswordChangeMessage {
  public static readonly SUCCESS = 'パスワードを変更しました。再度サインインしてください';
}

export class SnackbarAction {
  public static readonly CLOSE = '閉じる';
}

export class SessionMessage {
  public static readonly TIMEOUT = 'セッションが切れています。再度サインインしてください。';
}


export class MaxValue {
  public static readonly DECIMAL = 79228000000000000000000000000;
  public static readonly DOUBLE = Number.MAX_VALUE;
}
