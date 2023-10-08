import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutPageComponent,
    BoardPageComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
