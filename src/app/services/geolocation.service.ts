import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async getCurrentPosition() {
    let position;
    try {
      position = await Geolocation.getCurrentPosition(); 
    
    }catch(error) {
      position = {
        coords: {
          latitude: 0,
          longitude: 0,
          accuracy: 0,
        }
      }
    }
    return position;
  }
}
