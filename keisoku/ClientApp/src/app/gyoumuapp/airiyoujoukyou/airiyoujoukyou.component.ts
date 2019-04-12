import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSidenav, MatDialogRef, MatDialog } from '@angular/material';
import { AiRiyouJoukyouModel, AiriyoujoukyouService } from 'src/app/services/airiyoujoukyou.service';
import { AnkenService } from 'src/app/services/anken.service';
import { SpinnerdialogComponent } from 'src/app/components/spinnerdialog/spinnerdialog.component';

@Component({
  selector: 'app-airiyoujoukyou',
  templateUrl: './airiyoujoukyou.component.html',
  styleUrls: ['./airiyoujoukyou.component.css']
})
export class AiriyoujoukyouComponent implements OnInit {

  @Input('childToSidenav') sideNav: MatSidenav;

  isKakuteiDisabled: boolean = true;

  kakuteiIconColor = 'diabled';

  isKakutei: boolean = false;
  

  displayedColumns: string[] = ['name', 'month', 'tunnel', 'enchou', 'tanka', 'kei'];

  dataSource = new MatTableDataSource<AiRiyouJoukyouModel>();
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  

  constructor(
    private ankenService: AnkenService,
    private airiyoujoukyouService: AiriyoujoukyouService) { }
  
  ngOnInit() {}
  
  /**
   *  initialize
   *
   *  AI利用状況画面の内容を初期化する
   *
   *  
   *
   *  @return {void}
   */
  initialize() {

    const sortingDataAccessor = (data: AiRiyouJoukyouModel, sortHeaderId: string): string | number => {
      if (sortHeaderId === this.displayedColumns[0]) {
        return data.ankenName;
      }
      else if (sortHeaderId === this.displayedColumns[1]) {
        return data.month;
      }
      else if (sortHeaderId === this.displayedColumns[2]) {
        return data.tunnelNumber;
      }
      else if (sortHeaderId === this.displayedColumns[3]) {
        return data.souEnchou;
      }
      else if (sortHeaderId === this.displayedColumns[4]) {
        return data.tanka;
      }
      else if (sortHeaderId === this.displayedColumns[5]) {
        return data.kei;
      }

      return '';
    };

    this.bindAllAiRiyouJoukyouInfoLoginUser();

    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = sortingDataAccessor;

    this.dataSource.sort = this.sort;

    this.isKakutei = false;
  }


  /**
   *  destroy
   *
   *  AI利用状況画面の内容を破棄する
   *
   *  
   *
   *  @return {void}
   */
  destroy() {

    this.dataSource.data = [];
    

  }


  /**
   *  bindAllAiRiyouJoukyouInfoLoginUser
   *
   *  選択している案件の顧客ID、案件IDに紐付いている全てのAI利用状況情報をdataSourceにバインドする
   *
   *  
   *
   *  @return {void}
   */
  bindAllAiRiyouJoukyouInfoLoginUser() {

    if (!this.ankenService.selectedAnken) return;

    var customerId = this.ankenService.selectedAnken.customerId;
    var ankenId = this.ankenService.selectedAnken.ankenId;

    this.airiyoujoukyouService.getAllAiRiyouJoukyous(customerId, ankenId)
      .subscribe((response: any) => {

        this.dataSource.data = this.airiyoujoukyouService.convertAiRiyouJoukyouModels(response);

        this.isKakuteiDisabled = false;

        this.kakuteiIconColor = 'primary';

      },
      error => {

      });

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
   *  kakutei
   *
   *  確定する
   *  
   *
   *  @return {void}
   */
  kakutei() {

    this.isKakutei = true;


    this.sideNav.close();
  }
}
