import { TestBed } from '@angular/core/testing';
import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  let service: GeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get current position', async () => {
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((...args: any[]) => {
      const position = { coords: { latitude: 0, longitude: 0 } };
      args[0](position);
    });
    const coords = await service.getCurrentPosition();
    expect(coords).toBeTruthy();
  });
});
