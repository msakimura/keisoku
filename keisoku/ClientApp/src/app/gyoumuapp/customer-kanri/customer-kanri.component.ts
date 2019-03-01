import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSidenav } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomerService, CustomerModel } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-kanri',
  templateUrl: './customer-kanri.component.html',
  styleUrls: ['./customer-kanri.component.css']
})
export class CustomerKanriComponent implements OnInit {

  customerName: string;

  otameshi = false;

  displayedColumns: string[] = ['select', 'customerName', 'otameshi'];


  dataSource;

  selection = new SelectionModel<CustomerModel>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.customerService.customerModels);
    this.dataSource.paginator = this.paginator;
  }

  /**
   *  saveCustomerInfo
   *
   *  入力した顧客情報をDBに保存する
   *  
   *
   *  @return {void}
   */
  saveCustomerInfo() {

    var info: CustomerModel = {
      customerId: '',
      customerName: this.customerName
    };

    this.customerService.createCustomer(info);
    
    this.sideNav.close();
  }
}
