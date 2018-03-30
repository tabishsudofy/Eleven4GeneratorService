                 
                 //Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RoutingModuleModule,routingComponents} from './routing.module';
import {FormsModule} from '@angular/forms';
           // Imports Components 
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RoutingModuleModule,
    routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
