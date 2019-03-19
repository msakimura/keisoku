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
}

export class PasswordMessage {
  public static readonly MINLENGTH = '6文字以上入力してください';
  public static readonly ALPHABET = '英字を1文字以上含めてください';
  public static readonly LOWCASE = '小文字を1文字以上含めてください';
  public static readonly UPPERCASE = '大文字を1文字以上含めてください';
  public static readonly DIGIT = '数字を1文字以上含めてください';
  public static readonly SYMBOL = '記号を1文字以上含めてください';
}
