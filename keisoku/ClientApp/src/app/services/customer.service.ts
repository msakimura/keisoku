import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'protractor';

export interface CustomerModel {
  customerId: string;
  customerName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public customerModels: CustomerModel[] = new Array();

  constructor(private http: HttpClient) { }

  /**
   *  createCustomer
   *
   *  customerを顧客テーブルに追加する
   *  
   *
   *  @param  {CustomerModel}    customer
   *
   *  @return {void}
   */
  createCustomer(customer: CustomerModel) {

    this.http.post('api/customer', customer)
      .subscribe();
  }
}
