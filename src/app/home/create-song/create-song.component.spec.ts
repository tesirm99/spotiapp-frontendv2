import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateSongComponent } from './create-song.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('CreateSongComponent', () => {
  let component: CreateSongComponent;
  let fixture: ComponentFixture<CreateSongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSongComponent ],
      imports: [HttpClientTestingModule, IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebase)],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
