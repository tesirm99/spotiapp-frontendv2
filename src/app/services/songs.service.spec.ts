import { TestBed } from '@angular/core/testing';

import { SongsService } from './songs.service';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('SongsService', () => {
  let service: SongsService;
  let songId: string;
  let commentId: string;
  let auth: AuthService

  /*beforeAll(() => {
    auth = TestBed.inject(AuthService);
    auth.login('tesi2@gmail.com', '123456');
  });*/

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebase)],
      providers: [AuthService]
    });
    service = TestBed.inject(SongsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
/*
  it('getSongs', function(done) {
    service.getSongs().then(function(songs) {
      expect(songs.length >= 0).toBeTrue();
      done();
    });
  });

  it('createSong', function(done) {
    service.createSong({
      name: "test",
      artist: "test",
      album: "test",
      releaseDate: "test",
      comments: [],
      geolocation: [0,0],
      image: "test",
      href: "test",
      genre: "test",
      duration: 0,
      popularity: 0
    }).then(function(song) {
      expect(song.name == "test").toBeTrue();
      songId = song._id;
      done();
    });
  });


  it('getSongById', function(done) {
    service.getSongById(songId).then(function(song) {
      expect(song.name == "test").toBeTrue();
      done();
    });
  });

  it('updateSong', function(done) {
    service.updateSong({
      _id: songId,
      name: "test2",
      artist: "test",
      album: "test",
      releaseDate: "test",
      comments: [],
      geolocation: [0,0],
      image: "test",
      href: "test",
      genre: "test",
      duration: 0,
      popularity: 0
    }).then(function(song) {
      expect(song.name == "test2").toBeTrue();
      done();
    });
  });

  it('searchSongByName', function(done) {
    service.searchSongByName("test").subscribe(function(songs) {
      expect(songs.length >= 0).toBeTrue();
      done();
    });
  });

  it('searchSongByArtist', function(done) {
    service.searchSongByArtist("test").subscribe(function(songs) {
      expect(songs.length >= 0).toBeTrue();
      done();
    });
  });

  it('searchSongByAlbum', function(done) {
    service.searchSongByDate("test").subscribe(function(songs) {
      expect(songs.length >= 0).toBeTrue();
      done();
    });
  });

  it('searchSongFromSpotify', function(done) {
    service.searchSongFromSpotify("test").subscribe(function(songs) {
      expect(songs.length >= 0).toBeTrue();
      done();
      });
  });

  it('commentToSong', function(done) {
    service.commentToSong({
      author: "test",
      commentText: "test",
      stars: 0,
      date: "test",
      geolocation: [0,0],
      authorId: "test"
    }, songId).then(function(song) {
      expect(song.name == "test2").toBeTrue();
      commentId = song.comments[0]._id;
      done();
    });
  });

  it('getCommentsFromSong', function(done) {
    service.getComments(songId).then(function(comments) {
      expect(comments.length > 0).toBeTrue();
      done();
    });
  });

  it('deleteCommentFromSong', function(done) {
    service.deleteComment(songId, commentId).then(function(comments) {
      expect(comments.length == 0).toBeTrue();
      done();
    });
  });


  it('deleteSong', function(done) {
    service.deleteSong(songId).then(function(res) {
      expect(res).toBeTruthy();
      done();
    });
  });*/
  
});