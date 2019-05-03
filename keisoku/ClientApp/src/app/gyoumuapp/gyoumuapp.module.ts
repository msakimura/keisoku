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
    PasswordDialogComponent
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

  entryComponents: [PasswordDialogComponent]
})
export class GyoumuappModule { }
