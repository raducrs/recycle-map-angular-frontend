import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { SearchHint } from './interfaces/search-hint';
import { MapView } from './interfaces/map-view';
import {allDisplayOptions} from './search-filter-dropdown/search-filter-dropdown.component';

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
    },
    {
      description: 'Str. Hartiei',
      icon:
        'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      description: 'Str. Aplatica',
      icon:
        'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  activeFilterCategoryId = [];
  activeFilterCategoryObserver = new BehaviorSubject<boolean>(false);

  constructor() {}

  fetchSearchHints(searchTerm: string): Observable<SearchHint[]> {
    if (searchTerm) {
      return of(
        this.states.filter(state => state.description.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) >= 0)
      );
    } else {
      return of([]);
    }
  }

  fetchCategoryHints(searchTerm: string): Observable<any[]> {
    if (searchTerm) {
      return of(
        allDisplayOptions.filter(cat => cat.text.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) >= 0)
      );
    } else {
      return of([])
    }
  }

  updateMapView(mapView: MapView) {
    this.currentMapView = mapView;
  }

  removeFilter(categoryId: number) {
    this.activeFilterCategoryId = this.activeFilterCategoryId.filter(catId => catId !== categoryId);
    this.checkFilterStatus();
  }

  isFilterActive(categoryId: number){
    return this.activeFilterCategoryId.some(catId => catId === categoryId);
  }

  addFilter(categoryId: number) {
    if (!this.isFilterActive(categoryId)){
      this.activeFilterCategoryId.push(categoryId);
    }
    this.checkFilterStatus();
  }

  removeAllFilters() {
    this.activeFilterCategoryId = [];
    this.checkFilterStatus();
  }

  getFilter(): any[]{
    return [...this.activeFilterCategoryId];
  }

  private checkFilterStatus(){
    this.activeFilterCategoryObserver.next(this.activeFilterCategoryId.length > 0);
  }
  activeFilterObserver() {
    return this.activeFilterCategoryObserver;
  }
}
