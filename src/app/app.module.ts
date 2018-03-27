import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

import {RouterModule,Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerEntryComponent } from './customer-entry/customer-entry.component';
import { EmployeeEntryComponent } from './employee-entry/employee-entry.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DefaulterListComponent } from './defaulter-list/defaulter-list.component';
import { FeeEntryComponent } from './fee-entry/fee-entry.component';
import { FeeListComponent } from './fee-list/fee-list.component';
import { EmployeeBankComponent } from './employee-bank/employee-bank.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { SuperBankComponent } from './super-bank/super-bank.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';








const appRoutes : Routes = [
  {
    path : '',
    component : LoginComponent 
  },
  {
    path : 'dashboard',
    component : DashboardComponent
  },
  {
    path : 'customer-entry',
    component : CustomerEntryComponent
  },
  {
    path : 'employee-entry',
    component : EmployeeEntryComponent
  },
  {
    path:'customer-list',
    component : CustomerListComponent 
  },
  {
    path : 'employee-list',
    component : EmployeeListComponent
  },
  {
    path : 'defaulter-list' ,
    component : DefaulterListComponent
  },
  {
    path : 'fee-entry',
    component : FeeEntryComponent
  },
  {
    path : 'fee-list',
    component : FeeListComponent
  },
  {
    path : 'employee-bank',
    component : EmployeeBankComponent
  },
  {
    path : 'admin-account',
    component : AdminAccountComponent
  },
  {
    path : 'super-bank',
    component : SuperBankComponent
  },
  {
    path : '**',
    component : PageNotFoundComponent
  }


];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    CustomerEntryComponent,
    EmployeeEntryComponent,
    CustomerListComponent,
    EmployeeListComponent,
    DefaulterListComponent,
    FeeEntryComponent,
    FeeListComponent,
    EmployeeBankComponent,
    AdminAccountComponent,
    SuperBankComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
