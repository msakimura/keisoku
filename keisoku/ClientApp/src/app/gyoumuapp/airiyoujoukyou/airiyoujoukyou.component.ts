import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { TunnelComponent } from '../tunnel/tunnel.component';
import { AiRiyouJoukyouModel, AiriyoujoukyouService } from 'src/app/services/airiyoujoukyou.service';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-airiyoujoukyou',
  templateUrl: './airiyoujoukyou.component.html',
  styleUrls: ['./airiyoujoukyou.component.css']
})
export class AiriyoujoukyouComponent implements OnInit {

  displayedColumns: string[] = ['name', 'month', 'tunnel', 'enchou', 'tanka', 'kei'];

  dataSource = new MatTableDataSource<AiRiyouJoukyouModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private parent: TunnelComponent,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private airiyoujoukyouService: AiriyoujoukyouService) { }

  ngOnInit() {

    this.bindAllAiRiyouJoukyouInfoLoginUser();

    this.dataSource.paginator = this.paginator;
  }


  /**
   *  bindAllAiRiyouJoukyouInfoLoginUser
   *
   *  ログイン者の顧客IDに紐付いている全てのAI利用状況情報をdataSourceにバインドする
   *  
   *
   *  @return {void}
   */
  bindAllAiRiyouJoukyouInfoLoginUser() {
    if (this.userService.loginUserModel == null) {

      if (this.authenticationService.hasTokenInfo()) {
        this.userService.getUserFromLoginId(this.authenticationService.getTokenLoginId())
          .subscribe((response: any) => {
            this.userService.loginUserModel = this.userService.convertUserModel(response);

            this.bindAllAiRiyouJoukyouInfoCustomer(this.userService.loginUserModel.customerId);

          });
      }
    }
    else {
      this.bindAllAiRiyouJoukyouInfoCustomer(this.userService.loginUserModel.customerId);
    }

  }


  /**
   *  bindAllAiRiyouJoukyouInfoCustomer
   *
   *  customerIdに紐付く全てのAI利用状況情報をdataSourceにバインドする
   *  
   *  @param  {number}    customerId
   *  
   *  @return {void}
   */
  bindAllAiRiyouJoukyouInfoCustomer(customerId: number) {

    this.airiyoujoukyouService.getAllAiRiyouJoukyous(customerId)
      .subscribe((response: any) => {


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

    this.parent.closeSideNav();

  }

}
