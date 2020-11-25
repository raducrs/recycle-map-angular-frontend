import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {MapSearchService} from '../map-search.service';

export const allDisplayOptions = [{
  categoryId: 0,
  text: 'Hartie/Carton',
},
  {
    categoryId: 1,
    text: 'Plastic PET',

  },
  {
    categoryId: 2,
    text: 'Sticla ',

  },
  {
    categoryId: 3,
    text: 'Donatie haine ',

  },
  {
    categoryId: 0,
    text: 'Hartie/Carton',

  },
  {
    categoryId: 1,
    text: 'Plastic PET',

  },
  {
    categoryId: 2,
    text: 'Sticla ',

  },
  {
    categoryId: 3,
    text: 'Donatie haine ',

  },
  {
    categoryId: 0,
    text: 'Hartie/Carton',

  },
  {
    categoryId: 1,
    text: 'Plastic PET',

  },
  {
    categoryId: 2,
    text: 'Sticla ',

  },
  {
    categoryId: 3,
    text: 'Donatie haine ',

  }
];
@Component({
  selector: 'anms-search-filter-dropdown',
  templateUrl: './search-filter-dropdown.component.html',
  styleUrls: ['./search-filter-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SearchFilterDropdownComponent implements OnInit {

  @Output() close = new EventEmitter<any>();

  menuActive: number;


  displayOptions = [];
  checkStatus: boolean[] = [];
  activeOptions = [];

  constructor(private mapSearchService: MapSearchService) { }

  ngOnInit(): void {
    this.displayOptions = allDisplayOptions;
    this.checkStatus = allDisplayOptions.map(val => false);
    this.mapSearchService.getFilter().forEach(cat => this.checkStatus[cat] = true);
    this.menuActive = 0;
  }

  initActive(){
    const activeIds = this.mapSearchService.getFilter();
    this.activeOptions = allDisplayOptions
      .filter(cat => activeIds.some(act => act === cat.categoryId));
  }

  removeAllFilters(){
    this.mapSearchService.removeAllFilters();
    this.checkStatus = this.checkStatus.map(v => false);
  }

  removeOption(option){
    this.mapSearchService.removeFilter(option.categoryId);
    this.initActive();
    this.checkStatus[option.categoryId] = false;
  }

  isOptionChecked(option): boolean{
    return this.mapSearchService.isFilterActive(option.categoryId);
  }

  changeOption(option){
    console.log('option-checked', this.isOptionChecked(option))
    if (this.isOptionChecked(option)) {
      this.mapSearchService.removeFilter(option.categoryId);
      this.checkStatus[option.categoryId] = false;
    } else {
      this.mapSearchService.addFilter(option.categoryId)
      this.checkStatus[option.categoryId] = true;
    }
  }

  closeDemanded(){
    this.close.emit({});
  }

  changeToActiveMenu() {
    this.initActive()
    this.menuActive = 1;

  }

  changeToAllMenu() {
    this.menuActive = 0;
  }
}
