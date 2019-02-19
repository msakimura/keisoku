import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GyoumuappComponent } from './gyoumuapp.component';
import { GyoumuHeaderComponent } from './gyoumu-header/gyoumu-header.component';
import { MaterialModule } from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AnkenListComponent } from './anken-list/anken-list.component';
import { TunnelListComponent } from './tunnel-list/tunnel-list.component';
import { TunnelComponent } from './tunnel/tunnel.component';

@NgModule({
  declarations: [
    GyoumuappComponent,
    GyoumuHeaderComponent,
    AnkenListComponent,
    TunnelListComponent,
    TunnelComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path: '', component: GyoumuappComponent,
        children: [
          { path: '', component: AnkenListComponent, pathMatch: 'full' },
          { path: 'tunnellist', component: TunnelListComponent },
          { path: 'tunnel', component: TunnelComponent }
        ]
      }
      
    ])
  ],

  exports: [RouterModule]
  
})
export class GyoumuappModule { }
