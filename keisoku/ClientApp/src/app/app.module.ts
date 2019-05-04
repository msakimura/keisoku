import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpInterceptorService } from './Interceptor/http-interceptor.service';
import { ErrorInterceptorService } from './Interceptor/error-interceptor.service';
import { AuthorizationCheckService } from './services/authorization-check.service'
import { AuthenticationService } from './services/authentication.service'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerdialogComponent } from './components/spinnerdialog/spinnerdialog.component';
import { MessageSnackbarComponent } from './components/message-snackbar/message-snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerdialogComponent,
    MessageSnackbarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', loadChildren: './baseapp/baseapp.module#BaseappModule' },
      { path: 'gyoumu', loadChildren: './gyoumuapp/gyoumuapp.module#GyoumuappModule'}
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    AuthorizationCheckService,
    AuthenticationService],
  bootstrap: [AppComponent],
  entryComponents: [SpinnerdialogComponent]
})
export class AppModule { }
