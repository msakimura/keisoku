import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptionService {

  private signin: string;

  constructor() {
    this.signin = "サインイン";
  }

  getSignoutCaption(): string {
    this.signin = "サインアウト";
    return this.signin;
  }

  getSigninCaption(): string {
    this.signin = "サインイン";
    return this.signin;
  }
}
