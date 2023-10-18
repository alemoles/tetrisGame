import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ScorePageComponent } from './pages/score-page/score-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardPageComponent,
    LayoutPageComponent,
    ScorePageComponent,
    StartPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
