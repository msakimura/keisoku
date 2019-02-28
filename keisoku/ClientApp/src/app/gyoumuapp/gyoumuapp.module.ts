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
import { FormsModule  } from '@angular/forms';
import { UserKanriComponent } from './user-kanri/user-kanri.component';

@NgModule({
  declarations: [
    GyoumuappComponent,
    GyoumuHeaderComponent,
    AnkenListComponent,
    TunnelListComponent,
    TunnelComponent,
    UserKanriComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule ,
    RouterModule.forChild([
      {
        path: '', component: GyoumuappComponent,
        children: [
          { path: '', component: AnkenListComponent, pathMatch: 'full' },
          { path: 'tunnellist', component: TunnelListComponent },
          { path: 'tunnel', component: TunnelComponent },
          { path: 'userkanri', component: UserKanriComponent }
        ]
      }
      
    ])
  ],

  exports: [RouterModule]
  
})
export class GyoumuappModule { }
