import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GyoumuappComponent } from './gyoumuapp.component';
import { GyoumuHeaderComponent } from './gyoumu-header/gyoumu-header.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AnkenListComponent } from './anken-list/anken-list.component';
import { TunnelListComponent } from './tunnel-list/tunnel-list.component';
import { TunnelComponent } from './tunnel/tunnel.component';
import { FormsModule  } from '@angular/forms';
import { UserKanriComponent } from './user-kanri/user-kanri.component';
import { CustomerKanriComponent } from './customer-kanri/customer-kanri.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AiriyoujoukyouComponent } from './airiyoujoukyou/airiyoujoukyou.component';
import { AddimageComponent } from './addimage/addimage.component';
import { PreviewComponent } from './preview/preview.component';
import { OsiraseComponent } from './osirase/osirase.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { HibiwareshoriSettingComponent } from './hibiwareshori-setting/hibiwareshori-setting.component';
import { ImageorderSettingComponent } from './imageorder-setting/imageorder-setting.component';
import { ImageorderDialogComponent } from './imageorder-dialog/imageorder-dialog.component';
import { PrintSettingComponent } from './print-setting/print-setting.component';
import { CadSettingComponent } from './cad-setting/cad-setting.component';
import { TunnelKanriComponent } from './tunnel-kanri/tunnel-kanri.component';
import { DownloadComponent } from './download/download.component';

@NgModule({
  declarations: [
    GyoumuappComponent,
    GyoumuHeaderComponent,
    AnkenListComponent,
    TunnelListComponent,
    TunnelComponent,
    UserKanriComponent,
    CustomerKanriComponent,
    AiriyoujoukyouComponent,
    AddimageComponent,
    PreviewComponent,
    OsiraseComponent,
    PasswordDialogComponent,
    HibiwareshoriSettingComponent,
    ImageorderSettingComponent,
    ImageorderDialogComponent,
    PrintSettingComponent,
    CadSettingComponent,
    TunnelKanriComponent,
    DownloadComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: GyoumuappComponent,
        children: [
          { path: '', component: AnkenListComponent, pathMatch: 'full' },
          { path: 'tunnellist', component: TunnelListComponent },
          { path: 'tunnel', component: TunnelComponent },
          { path: 'userkanri', component: UserKanriComponent },
          { path: 'customerkanri', component: CustomerKanriComponent }
        ]
      }
      
    ])
  ],

  providers: [],

  exports: [RouterModule],

  entryComponents: [PasswordDialogComponent, ImageorderDialogComponent]
})
export class GyoumuappModule { }
