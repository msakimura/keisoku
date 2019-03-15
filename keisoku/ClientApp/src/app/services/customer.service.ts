import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CustomerModel {
  customerId: number;
  customerName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public customerModels: CustomerModel[] = new Array();

  private routeUrl: string = 'api/customer';
  
  constructor(private http: HttpClient) {}

  /**
   *  getAllCustomer
   *
   *  DBに登録されている全ての顧客情報を取得する
   *  
   *
   *  @return {Observable<Object>} フェッチ
   */
  getAllCustomer() {
    return this.http.get(this.routeUrl);
  }


  /**
   *  insertCustomer
   *
   *  customerをDBに追加する
   *  
   *
   *  @param  {CustomerModel}    customer
   *
   *  @return {Observable<Object>} フェッチ
   */
  insertCustomer(customer: CustomerModel) {
    
    return this.http.post(this.routeUrl, customer);
  }

  /**
   *  deleteCustomer
   *
   *  customerIdをDBから削除する
   *  
   *
   *  @param  {number}    customerId
   *
   *  @return {Observable<Object>} フェッチ
   */
  deleteCustomer(customerId: number) {
    return this.http.delete(this.routeUrl + '/' + customerId);
  }
}
