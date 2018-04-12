                 
                 //Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RoutingModuleModule,routingComponents} from './routing.module';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

           // Declare Components 
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {FilterPipe} from './pipes/feeListPipe.pipe';
import {CustomerListPipe} from './pipes/cutomerListPipe.pipe';



              //services
import {HttpService} from './services/http.service';
import {HttpModule} from '@angular/http';
import {CalculationService} from './services/calculation.service';
import {CalculationCustomerService} from './services/calculationCustomerList.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    FilterPipe,
    CustomerListPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModuleModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [HttpService,
    CalculationService,
    CalculationCustomerService,
    AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
