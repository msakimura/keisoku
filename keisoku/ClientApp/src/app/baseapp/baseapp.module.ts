import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseappComponent } from './baseapp.component';
import { BaseHeaderComponent } from './base-header/base-header.component';
import { MaterialModule } from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    BaseappComponent,
    BaseHeaderComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: BaseappComponent, pathMatch: 'full' }
    ])
  ],

  exports: [RouterModule]
})
export class BaseappModule { }
