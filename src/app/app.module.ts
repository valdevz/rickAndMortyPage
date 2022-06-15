import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { FilterPipe } from './pipes/filter.pipe';
import { APIService } from './services/api.service';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    LoadingComponent,
    AppComponent,
    FilterPipe,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    FormsModule
  ],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
