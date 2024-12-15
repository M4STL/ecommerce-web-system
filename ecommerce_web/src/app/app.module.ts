import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
//import {DemoNgZorroAntdModule} from './DemoNgZorroAntdModule';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginComponent } from './components/login/login.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
//import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
//import { NzButtonModule } from 'ng-zorro-antd/button';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
   ReactiveFormsModule,
   NzSpinModule,
   NzButtonModule,
   NzFormModule,
   NzInputModule,
   NzCheckboxModule,
   NzNotificationModule,
   
   //AdminModule,
   UserModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
