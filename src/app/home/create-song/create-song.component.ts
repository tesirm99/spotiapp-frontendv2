import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController, ToastController } from '@ionic/angular';
import { Song } from 'src/app/interfaces/song.interface';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss'],
})
export class CreateSongComponent  implements OnInit {

  song: Song = {
    name: '',
    artist: '',
    album: '',
    releaseDate: 0,
    genre: '',
    duration: 0,
    image: '',
    href: '',
    popularity: 0,
    geolocation: [0, 0],
    comments: []
  };

  togglePhoto: string = "img";
  photo: SafeResourceUrl | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  accuracy: number | undefined;

  formValidation: FormGroup | undefined; 
  errorMessage: string = ''; 

  formValidationMessages = { 
   'name': [
     { type: 'required', message: 'The songs name is mandatory.' },
   ],
   'artist': [
     { type: 'required', message: 'The artist is required.' },
   ],
    'album': [
      { type: 'required', message: 'The album is required.' },
    ],
    'releaseDate': [
      { type: 'required', message: 'The release date is required.' },
    ],
    'genre': [
      { type: 'required', message: 'The genre is required.' },
    ],
    'duration': [
      { type: 'required', message: 'The duration is required.' },
    ],
    'image': [
      { type: 'required', message: 'The image is required.' },
    ],
    'href': [
      { type: 'required', message: 'The href is required.' },
    ],
    'popularity': [
      { type: 'required', message: 'The popularity is required.' },
    ],

 };

  constructor(private songService: SongsService,
     private formBuilder: FormBuilder, 
     private router: Router,
     private sanitizer: DomSanitizer,
     private geolocationService: GeolocationService,
     private modalCtrl: ModalController,
     private toastCtrl: ToastController
  ) { }


  ngOnInit() {
    this.formValidation = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      artist: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      album: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      releaseDate: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      genre: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      duration: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      image: new FormControl('', Validators.compose([
        
      ])),
      href: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      popularity: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  async insertarCancion() {
    // Realiza una solicitud POST a la API para insertar la canción
    console.log('Insertar canción:', this.song, this.formValidation);

    if(this.photo != undefined) {
      this.song.image = this.photo.toString();
    }

    let res = await this.songService.createSong(this.song);

    console.log('Insertar canción:', res);
    this.confirm();
  }

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
