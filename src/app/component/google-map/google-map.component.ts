import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'google-chart',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  apiLoaded?: Observable<boolean>;
  key = 'AIzaSyAUa9etRbJHXatY5NPGcT4Qej9HqCsTqTg';

  options: google.maps.MapOptions = {
    center: { lat: 40, lng: -20 },
    zoom: 4,
  };

  center: google.maps.LatLngLiteral = { lat: 40, lng: -20 };
  zoom = 4;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.apiLoaded = this.http
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${this.key}`,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError((err) => {
          console.log(err);
          return of(false);
        })
      );
  }
}
