import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'protractor';
import { RequestOptions } from '@angular/http';
import { catchError } from 'rxjs/operators';

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
  
  obj = {
    CustomerId: 3,
    CustomerName: "A"
  };

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': "application/json" });
  }

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
   *  createCustomer
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
