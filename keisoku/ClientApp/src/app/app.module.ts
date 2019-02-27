import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpInterceptorService } from './Interceptor/http-interceptor.service';
import { ErrorInterceptorService } from './Interceptor/error-interceptor.service';
import { AuthorizationCheckService } from './services/authorization-check.service'
import { AuthenticationService } from './services/authentication.service'
import { TunnelService } from './services/tunnel.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerdialogComponent } from './shared/spinnerdialog/spinnerdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    SpinnerdialogComponent
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
      { path: 'home', component: HomeComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'gyoumu', loadChildren: './gyoumuapp/gyoumuapp.module#GyoumuappModule'}
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    AuthorizationCheckService,
    AuthenticationService,
    TunnelService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SpinnerdialogComponent]
})
export class AppModule { }
