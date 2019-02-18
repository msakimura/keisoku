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
  MatCheckboxModule
} from "@angular/material";

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
  MatCheckboxModule
];

@NgModule({
  imports: MAT_MODULES,
  exports: MAT_MODULES,
  declarations: []
})

export class MaterialModule { }
