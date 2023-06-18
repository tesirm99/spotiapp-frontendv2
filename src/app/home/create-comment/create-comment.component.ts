import { Component, Input, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/song.interface';
import { Comment } from 'src/app/interfaces/comment.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SongsService } from 'src/app/services/songs.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent  implements OnInit {

  @Input()
  song: Song | undefined;
  author: string | undefined;
  commentText: string | undefined;
  stars: number = 0;
  
  constructor(private authService: AuthService, private songService: SongsService, private toastCtrl: ToastController) { }

  ngOnInit() {}

  async sendComment() {
    if (this.song !== undefined && this.song._id && this.author && this.commentText) {
      let comment: Comment = {
        _id: '',
        author: this.author,
        commentText: this.commentText,
        stars: this.stars,
        authorId: await this.authService.getUser(),
        geolocation: [0,0],
        date: new Date().toISOString()
      }

      let res = await this.songService.commentToSong(comment, this.song._id);
      console.log(res);
      
      if (res.length > 0) {
        
        this.author = undefined;
        this.commentText = undefined;
        this.stars = 0;
        await this.presentToast('bottom', 'Comment added successfully');
        window.location.reload();
      } else {
        await this.presentToast('bottom', 'Error adding comment');
      }

    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
