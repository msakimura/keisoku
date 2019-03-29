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


  dataSource = new MatTableDataSource <CustomerModel>();

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

    this.bindAllCustomerInfo();
    
    this.dataSource.paginator = this.paginator;
    
  }

  /**
   *  bindAllCustomerInfo
   *
   *  DBに登録されている全ての顧客情報をdataSourceにバインドする
   *  
   *
   *  @return {void}
   */
  bindAllCustomerInfo() {
    this.customerService.getAllCustomer()
      .subscribe((data: any) => this.dataSource = new MatTableDataSource(data));
  }

  /**
   *  saveCustomerInfo
   *
   *  入力した顧客情報をDBに保存し、datasourceに追加する
   *  
   *
   *  @return {void}
   */
  saveCustomerInfo() {

    var info: CustomerModel = {
      customerId: 0,
      customerName: this.customerName
    };

    this.customerService.insertCustomer(info)
      .subscribe((newdata:any) => {
        const data = this.dataSource.data;
        data.push(newdata);

        this.dataSource.data = data;
      },
      error => { });
    
    this.sideNav.close();
  }

  /**
   *  deleteCustomerInfo
   *
   *  選択した顧客情報をDB、datasourceから削除する
   *  
   *
   *  @return {void}
   */
  deleteCustomerInfo() {
    this.customerService.deleteCustomer(this.selection.selected[0].customerId).subscribe();

    const data = this.dataSource.data;
    data.splice(0, 1);

    this.dataSource.data = data;

    this.selection.clear();
    
  }
}
