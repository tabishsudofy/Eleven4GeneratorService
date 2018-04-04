                 
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


              //services
import {HttpService} from './services/http.service';
import {HttpModule} from '@angular/http';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModuleModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
