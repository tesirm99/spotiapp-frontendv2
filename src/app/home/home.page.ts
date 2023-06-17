import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController, ToastButton, ToastController } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { Song } from '../interfaces/song.interface';
import { SongsService } from '../services/songs.service';
import { Router } from '@angular/router';
import { CreateSongComponent } from './create-song/create-song.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  message: string = "";
  isLoggedIn: boolean = false;
    
  tipoBusqueda: string = 'nombre';
  terminoBusqueda: string = '';
  textoPatata: string = 'Search for a song!'
  isLogged: boolean = false;
  songs: Song[] = [];
  spotifySongs: Song[] = [];
  selectedSongs = new Map<Song, Boolean>();
  sentSongs: number = 0;
  showSpotify: boolean = false;
  
  constructor(private songService: SongsService, private authService: AuthService, private modalCtrl: ModalController, private toastCtrl: ToastController, private router: Router) {}

  async ngOnInit() {
    this.authService.isLogged().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      console.log(this.isLoggedIn);
      // Realiza cualquier acción adicional que necesites al cambiar el estado de autenticación
    });

    this.songs = await this.songService.getSongs();
  }

  async showLogin(){
    const modal = await this.modalCtrl.create({
      component: LoginComponent
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

  }

  logout(){
    this.authService.logout();
  }

  resetTerminoBusqueda() {
    this.terminoBusqueda = ''; // Restablecer el término de búsqueda
  }

  buscar() {
    // Ejecutar la búsqueda según el tipo seleccionado
    if (this.tipoBusqueda === 'nombre') {
      this.buscarPorNombre();
    } else if (this.tipoBusqueda === 'artista') {
      this.buscarPorArtista();
    } else if (this.tipoBusqueda === 'fecha') {
      this.buscarPorFecha();
    } else if(this.tipoBusqueda === 'spotify') {
      this.buscarPorSpotify();
    }
  }

  buscarPorNombre() {
    // Lógica de búsqueda por nombre
    console.log('Búsqueda por nombre:', this.terminoBusqueda);
    this.songService.searchSongByName(this.terminoBusqueda).subscribe(
      (data: any) => {
        if(data.length == 0) {
          this.textoPatata = 'No results found :(';
        }
        this.songs = data;
        
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  buscarPorArtista() {
    // Lógica de búsqueda por artista
    console.log('Búsqueda por artista:', this.terminoBusqueda);
    this.songService.searchSongByArtist(this.terminoBusqueda).subscribe(
      (data: any) => {
        if(data.length == 0) {
          this.textoPatata = 'No results found :(';
        }
        console.log(data);
        this.songs = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  buscarPorFecha() {
    // Lógica de búsqueda por fecha
    console.log('Búsqueda por fecha:', this.terminoBusqueda);
    this.songService.searchSongByDate(this.terminoBusqueda).subscribe(
      (data: any) => {
        if(data.length == 0) {
          this.textoPatata = 'No results found :(';
        }
        console.log(data);
        this.songs = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  buscarPorSpotify() {
    // Lógica de búsqueda por fecha
    console.log('Búsqueda por spotify:', this.terminoBusqueda);
    this.songService.searchSongFromSpotify(this.terminoBusqueda).subscribe(
      (data: any) => {
        console.log(data.tracks.items);
        this.spotifySongs = [];
        data.tracks.items.forEach((element: any) => {
          let song: Song = {
            name: element.name,
            artist: element.artists[0].name,
            album: element.album.name,
            releaseDate: element.album.release_date,
            duration: element.duration_ms / (1000 * 60),
            href: element.external_urls.spotify,
            image: element.album.images[0].url,
            genre: "Genre not available",
            popularity: element.popularity,
            geolocation: [0, 0],
            comments: []
          }
          this.spotifySongs.push(song);
        });
        this.showSpotify = true;
        console.log(this.spotifySongs);
        console.log(this.showSpotify);
        
        
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  selectSong(song: Song) {
    this.selectedSongs!.set(song, !this.selectedSongs!.get(song));
  }

  async addSelectedSongs() {
    console.log(this.selectedSongs);
    
    const toast = await this.toastCtrl.create({
      message: 'Song(s) added successfully!',
      duration: 2000
    });
    const selectedSongs = this.spotifySongs.filter(song => this.selectedSongs!.get(song));
    console.log(selectedSongs);
    selectedSongs.forEach(song => {
      console.log(song);
      
      this.songService.createSong(song).then(
        async (data: any) => {
          console.log(data);
          this.sentSongs++;
          if(this.sentSongs == selectedSongs.length) {
            this.selectedSongs = new Map<Song, Boolean>();
            this.sentSongs = 0;
            this.songs = [];
            toast.present();
            this.showSpotify = false;
            this.songs = await this.songService.getSongs();
          }
      })
      .catch(
      (error: any) => {
        toast.message = 'Error adding songs!';
        toast.present();
        console.log(error);
      });
    });

  }

  areSongsSelected(): boolean {
    return Array.from(this.selectedSongs!.values()).some(value => value);
  }

  goToSongDetail(id: string) {
    console.log(id);
    this.router.navigate(['home/song/', id]);
  }

  async showAddSong() {
    const modal = await this.modalCtrl.create({
      component: CreateSongComponent
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  async resetSearch() {
    this.songs = await this.songService.getSongs();
    this.showSpotify = false;
  }

  getSongImage(song: Song): string {
    
    
    if (song.image.startsWith('http')) {
      // Si la imagen es una URL
      console.log(song.image);
      
      return song.image;
    } else {
      // Si la imagen es una cadena Base64
      console.log(song.image);
      
      return "data:image/jpeg;base64," + song.image;
    }
  }
}
