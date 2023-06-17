import { Component, OnInit, Input } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController, ToastController } from '@ionic/angular';
import { Song } from 'src/app/interfaces/song.interface';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss'],
})
export class EditSongComponent  implements OnInit {

  @Input() 
  song: Song | undefined;

  photo: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  accuracy: number | undefined;

  constructor(
    private songService: SongsService,
    private geolocationService: GeolocationService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    if(image && image.base64String)  {
      this.photo = "data:image/jpeg;base64," + image.base64String;
    }
    const position = await this.geolocationService.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.accuracy = position.coords.accuracy;
    
  }

  async updateSong() {
    const updatedSong = await this.songService.updateSong(this.song);
    
    if(updatedSong) {
      this.confirm();
    } else {
      this.cancel();
    }
  }

  async cancel() {
    const toast = this.toastCtrl.create({
      message: 'You cancelled the operation!',
      duration: 2000
    });
    (await toast).present();
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const toast = this.toastCtrl.create({
      message: 'You have created a new song!',
      duration: 2000
    });
    (await toast).present();
    return this.modalCtrl.dismiss("", 'confirm');
  }

}
