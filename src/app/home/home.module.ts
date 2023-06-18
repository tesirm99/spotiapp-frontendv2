import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { CreateSongComponent } from './create-song/create-song.component';
import { EditSongComponent } from './edit-song/edit-song.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { StarRatingComponent } from './star-rating/star-rating.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, LoginComponent, SongDetailComponent, CommentsComponent, CreateSongComponent, EditSongComponent, CreateCommentComponent, StarRatingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
