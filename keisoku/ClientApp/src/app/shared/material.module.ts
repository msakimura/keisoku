import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatSidenavModule,
  MatDialogModule,
  MatDividerModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule
} from "@angular/material";

import { MatSortModule } from '@angular/material/sort';

const MAT_MODULES = [
  MatTableModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatSidenavModule,
  MatDialogModule,
  MatDividerModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule,
  MatSortModule
];

@NgModule({
  imports: MAT_MODULES,
  exports: MAT_MODULES,
  declarations: []
})

export class MaterialModule { }
