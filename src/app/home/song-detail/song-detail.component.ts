import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Song } from 'src/app/interfaces/song.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SongsService } from 'src/app/services/songs.service';
import { LoginComponent } from '../login/login.component';
import { EditSongComponent } from '../edit-song/edit-song.component';
import { CreateCommentComponent } from '../create-comment/create-comment.component';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'],
})
export class SongDetailComponent  implements OnInit {

  song: Song | undefined;
  isLoggedIn: boolean = false;
  
  constructor(private songService: SongsService, private activatedRoute: ActivatedRoute, private authService: AuthService,  private alertController: AlertController, private router: Router, private modalCtrl: ModalController, private toastCtrl: ToastController) { 
    this.activatedRoute.params.subscribe(async params => {
      if(params['id'] != undefined){
        this.song = await this.songService.getSongById(params['id']);
      }
    });
  }

  ngOnInit() {
    this.authService.isLogged().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      console.log(this.isLoggedIn);
      // Realiza cualquier acción adicional que necesites al cambiar el estado de autenticación
    });
  }

  handleDeleteAlert(songId: string) {
    this.alertController.create({
      header: 'Confirm delete',
      message: 'Are you sure you want to delete this comment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'confirm',
          handler: () => {
            this.deleteSong(songId);
          }
        },
      ]
    }).then(alert => alert.present());
  }

  async deleteSong(songId: string) {
    let res = await this.songService.deleteSong(songId);
    if (res) {
      this.router.navigate(['home']).then(async () => {
        const toast = this.toastCtrl.create({
          message: 'Song deleted successfully!',
          duration: 2000
        });
        (await toast).present().then(() => {
          window.location.reload();
        });
        
      });
    }
  }

  async showLogin(){
    const modal = await this.modalCtrl.create({
      component: LoginComponent
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

  }

  async showEditSong(){
    const modal = await this.modalCtrl.create({
      component: EditSongComponent,
      componentProps: {
        song: this.song
      }
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if(role === 'confirm') {
      window.location.reload();
    }
  }

  logout(){
    this.authService.logout();
  }

  async showNewComment() {
    const modal = await this.modalCtrl.create({
      component: CreateCommentComponent,
      componentProps: {
        song: this.song
      },
      cssClass: 'createcommentmodal'
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if(role === 'confirm') {
      window.location.reload();
    }
  }
}
