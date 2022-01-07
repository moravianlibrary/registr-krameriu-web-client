import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { DetailComponent } from './detail/detail.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TableComponent,
    DetailComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
