import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchHint } from './interfaces/search-hint';
import { MapView } from './interfaces/map-view';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {
  currentMapView: MapView;

  states: SearchHint[] = [
    {
      description:
        'Arkansasaaaaaaaaaaaaa Arkansasaaaaaaaaaaaaa Arkansasaaaaaaaaaaaaa Arkansasaaaaaaaaaaaaa',
      icon:
        'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      description: 'California',
      icon:
        'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      description: 'Florida',
      icon:
        'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      description: 'Texas',
      icon:
        'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  constructor() {}

  fetchSearchHints(searchTerm: string): Observable<SearchHint[]> {
    return of(
      this.states.filter(state => state.description.indexOf(searchTerm) >= 0)
    );
  }

  updateMapView(mapView: MapView) {
    this.currentMapView = mapView;
  }
}
