import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async getCurrentPosition() {
    const position = await Geolocation.getCurrentPosition(); 
    console.log(position)
    return position;
  }
}
