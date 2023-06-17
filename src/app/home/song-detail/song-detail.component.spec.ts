import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';

import { SongDetailComponent } from './song-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { SongsService } from 'src/app/services/songs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

describe('SongDetailComponent', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;
  let songsService: SongsService;
  let authService: AuthService;
  let alertController: AlertController;
  let router: Router;
  let modalController: ModalController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongDetailComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'mock-song-id' }),
          },
        },
        {
          provide: SongsService,
          useValue: jasmine.createSpyObj('SongsService', ['getSongById', 'deleteSong']),
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['isLogged', 'logout']),
        },
        {
          provide: AlertController,
          useValue: jasmine.createSpyObj('AlertController', ['create']),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        {
          provide: ModalController,
          useValue: jasmine.createSpyObj('ModalController', ['create', 'dismiss']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongDetailComponent);
    component = fixture.componentInstance;
    songsService = TestBed.inject(SongsService);
    authService = TestBed.inject(AuthService);
    alertController = TestBed.inject(AlertController);
    router = TestBed.inject(Router);
    modalController = TestBed.inject(ModalController);
  });

  it('should create', () => {
    spyOn(authService, 'isLogged').and.returnValue(of(true));
    expect(component).toBeTruthy();
  });

  /*it('should load song on initialization', async () => {
    const mockSong = { id: 'mock-song-id' };
    const getSongByIdSpy = songsService.getSongById.and.returnValue(Promise.resolve(mockSong));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(getSongByIdSpy).toHaveBeenCalledWith('mock-song-id');
    expect(component.song).toEqual(mockSong);
  });*/

  /*it('should handle delete confirmation', async () => {
    const deleteSongSpy = songsService.deleteSong.and.returnValue(Promise.resolve(true));
    const navigateSpy = router.navigate.and.returnValue(Promise.resolve(true));

    component.handleDeleteAlert('mock-song-id');

    expect(alertController.create).toHaveBeenCalled();

    const alert = /* mock the alert */;

    /*await alert.present();

    /* simulate confirming the delete action */
/*
    expect(deleteSongSpy).toHaveBeenCalledWith('mock-song-id');
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  });*/


  it('should logout', () => {
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
