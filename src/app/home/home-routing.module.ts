import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { SongDetailComponent } from './song-detail/song-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'song/:id',
    component: SongDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
