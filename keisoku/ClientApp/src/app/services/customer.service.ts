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
   *  customerをDBから削除する
   *  
   *
   *  @param  {CustomerModel}    customer
   *
   *  @return {Observable<Object>} フェッチ
   */
  deleteCustomer(customer: CustomerModel) {
    return this.http.delete(this.routeUrl + '/' + customer.customerId);
  }

  /**
   *  updateCustomer
   *
   *  customerのDBを更新する
   *  
   *
   *  @param  {CustomerModel}    customer
   *
   *  @return {Observable<Object>} フェッチ
   */
  updateCustomer(customer: CustomerModel) {

    return this.http.put(this.routeUrl, customer);
  }

  /**
   *  convertCustomerModel
   *
   *  DBから取得したcustomerを顧客モデルに変換する
   *  
   *
   *  @param  {object}    customer
   *
   *  @return {CustomerModel} 顧客モデル
   */
  convertCustomerModel(customer): CustomerModel {

    var customerModel: CustomerModel = {
      customerId: customer.customerId,
      customerName: customer.customerName
    };


    return customerModel;
  }
}
