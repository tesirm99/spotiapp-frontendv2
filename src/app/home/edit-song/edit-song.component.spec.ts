import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSongComponent } from './edit-song.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('EditSongComponent', () => {
  let component: EditSongComponent;
  let fixture: ComponentFixture<EditSongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSongComponent ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSongComponent);
    component = fixture.componentInstance;
    component.song = {
      _id: '1',
      name: 'test',
      artist: 'test',
      album: 'test',
      image: 'test',
      releaseDate: 1,
      comments: [],
      duration: 1,
      genre: 'test',
      geolocation: [1,1],
      href: 'test',
      popularity: 1,
    }
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
