import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'start-game',
        component: StartPageComponent,
      },
      {
        path: 'board',
        component: BoardPageComponent,

      },
      {
        path: '**',
        redirectTo: 'start-game'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
