import { Injectable } from '@angular/core';
import { Song } from '../interfaces/song.interface';
import { Comment } from '../interfaces/comment.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeolocationService } from './geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  songAPIURL = "http://localhost:3000/songs";

  constructor(private http: HttpClient, private geoService: GeolocationService) { }

  async getSongs(): Promise<Song[]> {
    let res = await fetch(this.songAPIURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await res.json();
  }

  async getSongById(id: string): Promise<Song> {
    
    let res = await fetch(this.songAPIURL + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await res.json();
  }

  async createSong(song: any) {
    
    if(localStorage.getItem('token') == null) throw new Error('No token found');

    let pos = await this.geoService.getCurrentPosition();
    song.geolocation = [pos.coords.latitude, pos.coords.longitude];
    song.comments = [];

    console.log('song service: ', song);
    
    let res = await fetch(this.songAPIURL + '/newsong', {
      method: 'POST',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    return await res.json();
  }

  async updateSong(song: any) {
    if(localStorage.getItem('token') == null) throw new Error('No token found');

    let res = await fetch(this.songAPIURL + '/' + song._id, {
      method: 'PUT',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    return await res.json();
  }

  async deleteSong(id: string) {
    if(localStorage.getItem('token') == null) throw new Error('No token found');

    let res = await fetch(this.songAPIURL + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    return await res.json();
  }

  searchSongFromSpotify(name: string): Observable<Song[]> {
    if(localStorage.getItem('token') == null) throw new Error('No token found');

    return this.http.get<Song[]>(this.songAPIURL + '/fetchSongsFromSpotify/' + name, 
    { 
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + localStorage.getItem('token') 
      } 
    });
  }

  searchSongByName(name: string): Observable<Song[]> {
    return this.http.get<Song[]>(this.songAPIURL + '/searchByName/' + name);
  }

  searchSongByArtist(artist: string): Observable<Song[]> {
    return this.http.get<Song[]>(this.songAPIURL + '/searchByArtist/' + artist);
  }

  searchSongByDate(date: string): Observable<Song[]> {
    return this.http.get<Song[]>(this.songAPIURL + '/searchByDate/' + date);
  }

  async commentToSong(comment: Comment, songId: string) {
    let pos = await this.geoService.getCurrentPosition();
    
    comment.geolocation = [pos.coords.latitude, pos.coords.longitude];
    comment.authorId = localStorage.getItem('id') || 'Anonymous';
    
    let res = await fetch(this.songAPIURL + '/' + songId + '/comments', {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let json = await res.json();

    return json;
  }

  async getComments(songId: string): Promise<Comment[]> {
    let res = await fetch(this.songAPIURL + '/' + songId + '/comments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return await res.json();
  }

  async deleteComment(songId: string, commentId: string) {
    if(localStorage.getItem('token') == null) throw new Error('No token found');

    let res = await fetch(this.songAPIURL + '/' + songId + '/comments/' + commentId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    return await res.json();
  }


}
