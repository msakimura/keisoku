import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSidenav, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomerService, CustomerModel } from 'src/app/services/customer.service';
import { FormControl, Validators } from '@angular/forms';
import { InputMessage } from 'src/app/shared/constant.module';

@Component({
  selector: 'app-customer-kanri',
  templateUrl: './customer-kanri.component.html',
  styleUrls: ['./customer-kanri.component.css']
})
export class CustomerKanriComponent implements OnInit {
  isAdd: boolean = false;

  isEdit: boolean = false;

  isEditDisabled: boolean = true;

  editIconColor = 'diabled';

  isDeleteDisabled: boolean = true;

  deleteIconColor = 'diabled';



  customerFormControl = new FormControl('', [Validators.required]);

  hissuCustomerMessage: string = InputMessage.HISSU_CUSTOMER;


  otameshi = false;

  displayedColumns: string[] = ['select', 'customerName', 'otameshi'];


  dataSource = new MatTableDataSource <CustomerModel>();

  selection = new SelectionModel<CustomerModel>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  @ViewChild(MatSort) sort: MatSort;

  

  constructor(private customerService: CustomerService) { }

  ngOnInit() {

    this.bindAllCustomerInfo();
    
    this.dataSource.paginator = this.paginator;
    
  }


  /**
   *  applyFilterCustomerName
   *
   *  顧客名をfilterValueでフィルタする
   *  
   *  @param  {string}    filterValue
   *  
   *  @return {void}
   */
  applyFilterCustomerName(filterValue: string) {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.customerName.toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  /**
   *  isAllSelected
   *
   *  全てのチェックボックスが選択されているか判定する
   *  
   *
   *  @return {boolean} 判定結果
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   *  masterToggle
   *
   *  ヘッダーのチェックボックス選択時、全レコードのチェックボックスの選択有無を切り替える
   *  
   *
   *  @return {boid}
   */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));

    this.changeDisabled();
  }


  /**
   *  selectToggle
   *
   *  レコードrowのチェックボックスの選択有無を切り替える
   *  
   *  @param  {object}    row
   *
   *  @return {boid}
   */
  selectToggle(row) {
    this.selection.toggle(row);

    this.changeDisabled();
  }


  /**
   *  changeDisabled
   *
   *  レコードのチェックボックス選択数によって、編集ボタン・削除ボタンの活性/不活性を切り替える
   *  
   *
   *  @return {boid}
   */
  changeDisabled() {

    this.switchDisabledEditButton(true);

    this.switchDisabledDeleteButton(true);

    const numSelected = this.selection.selected.length;

    if (numSelected >= 1) {

      if (numSelected == 1) {
        this.switchDisabledEditButton(false);
      }

      this.switchDisabledDeleteButton(false);

    }
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
      customerName: this.customerFormControl.value
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


  /**
   *  switchDisabledDeleteButton
   *
   *  削除ボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledDeleteButton(disabled: boolean) {

    this.isDeleteDisabled = disabled;

    this.deleteIconColor = disabled ? 'diabled' : 'primary';

  }


  /**
   *  switchDisabledEditButton
   *
   *  編集ボタンの活性/不活性を切り替える
   *  
   *  @param  {boolean}    disabled
   *  
   *  @return {void}
   */
  switchDisabledEditButton(disabled: boolean) {

    this.isEditDisabled = disabled;

    this.editIconColor = disabled ? 'diabled' : 'primary';

  }
  

  /**
   *  closeSideNav
   *
   *  サイドナビを閉じる
   *  
   *
   *  @return {void}
   */
  closeSideNav() {
    this.sideNav.close();

  }


  /**
   *  displayAddSideNav
   *
   *  追加用のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displayAddSideNav() {

    this.isAdd = true;

    this.sideNav.open();
  }


  /**
   *  displayEditSideNav
   *
   *  選択した顧客情報について、編集用のサイドナビを表示する
   *  
   *
   *  @return {void}
   */
  displayEditSideNav() {

    var customer = this.selection.selected[0];

    this.customerFormControl.setValue(customer.customerName);

    this.isEdit = true;

    this.sideNav.open();
  }
}
