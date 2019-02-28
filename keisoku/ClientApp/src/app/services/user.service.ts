import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

export interface UserModel {
  customerId: string;
  userId: string;
  loginId: string;
  password: string;
  userName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userModels: UserModel[] = new Array();

  constructor(private http: HttpClient) { }

  registerUser(user: UserModel) {
    
    this.http.post('api/user', user)
      .subscribe();
  }

}
