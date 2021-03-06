import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseappComponent } from './baseapp.component';
import { BaseHeaderComponent } from './base-header/base-header.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopComponent } from './top/top.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFooterComponent } from './base-footer/base-footer.component';

@NgModule({
  declarations: [
    BaseappComponent,
    BaseHeaderComponent,
    TopComponent,
    LoginDialogComponent,
    BaseFooterComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: BaseappComponent,
        children: [
          { path: '', component: TopComponent, pathMatch: 'full'}
        ]
      }
    ])
  ],

  exports: [RouterModule],
  entryComponents: [LoginDialogComponent]
})
export class BaseappModule { }
